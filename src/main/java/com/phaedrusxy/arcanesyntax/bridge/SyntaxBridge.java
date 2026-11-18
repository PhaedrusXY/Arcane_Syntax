package com.phaedrusxy.arcanesyntax.bridge;

import buildaspell.api.BuildASpellAPI;
import buildaspell.config.ModConfig;
import buildaspell.registry.ModAttachments;
import buildaspell.spell.DeliveryMethod;
import buildaspell.spell.SpellEffect;
import buildaspell.spell.SpellModifier;
import buildaspell.spell.PlayerSpellData;
import com.leclowndu93150.thaumaturge.api.aspect.IAspect;
import com.leclowndu93150.thaumaturge.api.aspect.TTAspects;
import com.leclowndu93150.thaumaturge.api.spell.*;
import com.leclowndu93150.thaumaturge.api.spell.event.SpellCastEvent;
import com.leclowndu93150.thaumaturge.api.wands.WandVis;
import com.leclowndu93150.thaumaturge.content.spell.engine.SpellEngine;
import com.leclowndu93150.thaumaturge.content.spell.item.FocusItems;
import com.leclowndu93150.thaumaturge.content.wands.WandVisHelper;
import com.phaedrusxy.arcanesyntax.ArcaneSyntaxUnified;
import com.phaedrusxy.arcanesyntax.IntegrationConfig;
import com.phaedrusxy.arcanesyntax.core.*;
import net.minecraft.core.HolderLookup;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceKey;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;
import net.neoforged.neoforge.common.NeoForge;
import java.util.*;

/** Native focus -> complete BaS program. No personal mana manipulation and no raw aura fallback. */
public final class SyntaxBridge {
    private SyntaxBridge() {}
    public record Prepared(SpellPlan plan, buildaspell.spell.Spell executable, float vis) {}

    public static boolean containsSyntax(Spell spell) {
        if (spell == null) return false;
        Deque<SpellNode> work = new ArrayDeque<>();
        work.push(spell.root());
        int scanned = 0;
        while (!work.isEmpty()) {
            SpellNode n = work.pop();
            if (Catalog.isSyntax(n.part().identifier().toString())) return true;
            // Native focus trees cannot normally approach this. Treat suspicious huge trees as
            // bridge candidates so our bounded compiler refuses them rather than flattening them.
            if (++scanned > 4096) return true;
            work.addAll(n.children());
        }
        return false;
    }

    private static PlanCompiler.Node readNode(SpellNode n, int depth, int[] count) {
        if (depth > PlanCompiler.MAX_NODES || ++count[0] > 256)
            throw new PlanCompiler.InvalidSpell("Spell is too large for the Syntax compiler.");
        List<PlanCompiler.Node> children = new ArrayList<>();
        for (SpellNode child : n.children()) children.add(readNode(child, depth + 1, count));
        return new PlanCompiler.Node(n.part().identifier().toString(), n.settings().getOrDefault("stacks", 1), children);
    }

    public static boolean available(Player player, Catalog.Entry entry) {
        try { checkAvailable(player, entry); return true; }
        catch (IllegalArgumentException | IllegalStateException e) { return false; }
    }

    private static void checkAvailable(Player player, Catalog.Entry entry) {
        boolean enforce = player != null && IntegrationConfig.requireLearning() && !player.getAbilities().instabuild;
        PlayerSpellData learned = enforce ? player.getData(ModAttachments.PLAYER_SPELL_DATA.get()) : null;
        boolean enabled;
        boolean known;
        switch (entry.kind()) {
            case DELIVERY -> {
                DeliveryMethod d = DeliveryMethod.fromId(entry.id());
                if (d == null) throw new IllegalArgumentException("Unknown delivery: " + entry.id());
                enabled = ModConfig.isDeliveryEnabled(d);
                known = learned == null || learned.isDeliveryUnlocked(d);
            }
            case EFFECT -> {
                SpellEffect e = SpellEffect.fromId(entry.id());
                if (e == null) throw new IllegalArgumentException("Unknown effect: " + entry.id());
                enabled = ModConfig.isEffectEnabled(e);
                known = learned == null || learned.isEffectUnlocked(e);
            }
            case MODIFIER -> {
                SpellModifier m = SpellModifier.fromId(entry.id());
                if (m == null) throw new IllegalArgumentException("Unknown modifier: " + entry.id());
                enabled = ModConfig.isModifierEnabled(m);
                known = learned == null || learned.isModifierUnlocked(m);
            }
            default -> throw new IllegalArgumentException("Unknown component kind.");
        }
        if (!enabled) throw new IllegalArgumentException("Disabled Build a Spell component: " + entry.id());
        if (!known) throw new IllegalArgumentException("Learn this component first: " + entry.id());
    }

    /** Client candidate check. Partial drafts are allowed; no player state or draft is changed. */
    public static boolean compatibleDraft(Spell nativeSpell) {
        try {
            if (nativeSpell.style() != CastStyle.INSTANT) return false;
            SpellPlan plan = PlanCompiler.compilePartial(readNode(nativeSpell.root(), 0, new int[]{0}),
                    buildaspell.spell.Spell.maxComponents());
            ComponentCompatibility.validate(plan);
            if (IntegrationConfig.blockBreakFill()) TierRules.validateCombinations(plan);
            return true;
        } catch (IllegalArgumentException | IllegalStateException e) {
            return false;
        }
    }

    public static Prepared prepare(Spell nativeSpell, Player player) {
        if (nativeSpell.style() != CastStyle.INSTANT)
            throw new IllegalArgumentException("Arcane Syntax currently supports Instant casting only.");
        SpellPlan plan = PlanCompiler.compile(readNode(nativeSpell.root(), 0, new int[]{0}), buildaspell.spell.Spell.maxComponents());
        checkAvailable(player, Catalog.find(Catalog.NAMESPACE + ":delivery/" + plan.delivery()).orElseThrow());
        for (SpellPlan.Instruction instruction : plan.instructions()) {
            String part = Catalog.NAMESPACE + ":" + instruction.kind().name().toLowerCase(Locale.ROOT) + "/" + instruction.id();
            checkAvailable(player, Catalog.find(part).orElseThrow());
        }
        ComponentCompatibility.validate(plan);
        if (IntegrationConfig.blockBreakFill()) TierRules.validateCombinations(plan);
        buildaspell.spell.Spell executable = BuildASpellAPI.createSpell(plan.delivery(), plan.apiComponents());
        if (executable == null || !executable.hasAnyEffect()) throw new IllegalArgumentException("Build a Spell rejected the composition.");
        int actual = executable.getComponents().size() + executable.getDeliveryModifiers().size();
        if (actual != plan.instructions().size())
            throw new IllegalArgumentException("Build a Spell altered or truncated this composition; it was not inscribed or cast.");
        float quote = CostMath.vis(executable.getManaCost(), IntegrationConfig.visPerMana(), IntegrationConfig.minimumVis());
        return new Prepared(plan, executable, quote);
    }

    /** One quote feeds editor, inscription, tooltip, native affordability check, and final payment. */
    public static SpellSummary analyze(Spell spell, FocusTier tier, Player player, SpellSummary original) {
        if (!containsSyntax(spell)) return original;
        List<SpellProblem> problems = new ArrayList<>(original.problems());
        float vis = original.vis();
        try {
            Prepared ready=prepare(spell,player);
            if(IntegrationConfig.enforceTiers()) TierRules.requireTier(ready.plan(),FocusEquipment.rank(tier));
            vis=ready.vis();
        }
        catch (IllegalArgumentException | IllegalStateException e) {
            problems.add(SpellProblem.of(Component.literal("Arcane Syntax: " + e.getMessage()), true));
        }
        // Deliberately neutral first-pass aspect distribution. One crystal of each primal is
        // charged by the native inscription workstation; the same weights divide casting Vis.
        Map<ResourceKey<IAspect>, Integer> crystals = new LinkedHashMap<>();
        for (ResourceKey<IAspect> primal : TTAspects.PRIMALS) crystals.put(primal, 1);
        return new SpellSummary(original.complexity(), original.budget(), vis, original.xp(), crystals,
                original.depth(), original.branches(), original.repeats(), original.cooldown(),
                original.chargeTicks(), original.pulseInterval(), List.copyOf(problems));
    }

    /** Called only from the native wand's paid player-casting boundary, before the original charge. */
    public static boolean cast(Player player, ItemStack wand, ItemStack focus, Spell spell,
                               SpellSummary summary, float power, float visShare) {
        if (!(player instanceof ServerPlayer serverPlayer)) return false;
        if (!summary.valid()) {
            for (SpellProblem problem : summary.problems()) if (problem.fatal()) {
                serverPlayer.sendSystemMessage(problem.message(), true);
                return false;
            }
            return false;
        }
        final Prepared prepared;
        try {
            prepared=prepare(spell,player);
            if(IntegrationConfig.enforceTiers()) TierRules.requireTier(prepared.plan(),FocusEquipment.rank(focus));
        }
        catch (IllegalArgumentException | IllegalStateException e) { return refuse(serverPlayer, e.getMessage()); }
        if (power != 1.0f || visShare != 1.0f)
            return refuse(serverPlayer, "Charged or channeled Arcane Syntax is not supported by Unified Casting.");

        SpellCastEvent.Pre pre = SpellEngine.firePre(player, focus, spell, power, prepared.vis());
        if (pre.isCanceled()) return false;
        // Do not silently ignore an external native power multiplier: BaS carriers resolve power
        // differently, so multiplying only the initial call would be wrong for delayed impacts.
        if (pre.power() != 1.0f)
            return refuse(serverPlayer, "An external Thaumaturge power multiplier cannot yet be applied consistently to this spell.");

        final int centivis;
        try { centivis = CostMath.centivis(pre.visCost()); }
        catch (IllegalArgumentException e) { return refuse(serverPlayer, e.getMessage()); }
        Map<ResourceKey<IAspect>, Integer> split = WandVisHelper.primalSplit(centivis,
                FocusItems.aspects(summary, player.registryAccess()));
        boolean charged = !player.getAbilities().instabuild && centivis > 0;
        WandVis before = WandVisHelper.chargeOf(wand);
        if (charged && !WandVisHelper.payCosts(wand, player, split, true, false))
            return refuse(serverPlayer, shortage(player, wand, split));
        PaymentReceipt<ResourceKey<IAspect>> receipt = PaymentReceipt.between(
                before.centivis(), WandVisHelper.chargeOf(wand).centivis());

        // false bypasses only BaS personal mana. Its spell executor and the separate Fix mod
        // still process the complete spell, including projectiles and delayed/combined effects.
        float manaBefore = IntegrationConfig.logCasts() ? player.getData(ModAttachments.PLAYER_MANA.get()).getCurrentMana() : Float.NaN;
        boolean dispatched = BuildASpellAPI.cast(serverPlayer, prepared.executable(), false);
        if (!dispatched) {
            if (charged) WandVisHelper.writeCharge(wand,
                    new WandVis(receipt.refundInto(WandVisHelper.chargeOf(wand).centivis())));
            ArcaneSyntaxUnified.LOG.log(System.Logger.Level.WARNING, "BaS rejected a validated Syntax spell; refunded this attempt's wand debit.");
            return refuse(serverPlayer, "Build a Spell could not dispatch the spell; the Vis charge was returned.");
        }
        NeoForge.EVENT_BUS.post(new SpellCastEvent.Post(player, focus, spell));
        if (IntegrationConfig.logCasts()) ArcaneSyntaxUnified.LOG.log(System.Logger.Level.INFO,
                "Syntax cast: " + prepared.plan().delivery() + " " + prepared.plan().apiComponents()
                        + "; pre-discount Vis=" + pre.visCost() + "; debited=" + receipt.debited()
                        + "; BaS mana=" + manaBefore + " -> " + player.getData(ModAttachments.PLAYER_MANA.get()).getCurrentMana());
        // The surrounding native use() starts its ordinary cooldown only when this returns true.
        return true;
    }

    /** Non-mutating check before native use() can return its generic affordability failure. */
    public static String useProblem(Player player, ItemStack wand, ItemStack focus, Spell spell) {
        try {
            Prepared ready=prepare(spell,player);
            if(IntegrationConfig.enforceTiers()) TierRules.requireTier(ready.plan(),FocusEquipment.rank(focus));
            if(player.getAbilities().instabuild) return null;
            int quote=CostMath.centivis(ready.vis());
            if(quote<=0) return null;
            Map<ResourceKey<IAspect>,Integer> split=WandVisHelper.evenSplit(quote);
            if(!WandVisHelper.payCosts(wand,player,split,false,false)) return shortage(player,wand,split);
            return null;
        } catch(IllegalArgumentException | IllegalStateException e) { return e.getMessage(); }
    }
    private static String shortage(Player player, ItemStack wand, Map<ResourceKey<IAspect>,Integer> split) {
        List<String> missing=new ArrayList<>();
        for(var cost:split.entrySet()) {
            int owed=(int)(cost.getValue()*WandVisHelper.costFactor(wand,player,cost.getKey(),false));
            int held=WandVisHelper.storedIn(wand,cost.getKey());
            if(held<owed) missing.add(cost.getKey().identifier().getPath()+" "+String.format(Locale.ROOT,"%.2f/%.2f",held/100.0,owed/100.0));
        }
        return "Not enough Vis (have/need): "+String.join(", ",missing)+".";
    }

    public static boolean refuse(ServerPlayer player, String reason) {
        player.sendSystemMessage(Component.literal("Arcane Syntax: " + reason), true);
        return false;
    }
}
