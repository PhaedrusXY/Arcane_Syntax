package com.phaedrusxy.arcanesyntax.bridge;

import buildaspell.spell.DeliveryMethod;
import buildaspell.spell.ModifierApplicability;
import buildaspell.spell.SpellEffect;
import buildaspell.spell.SpellModifier;
import com.phaedrusxy.arcanesyntax.core.Catalog;
import com.phaedrusxy.arcanesyntax.core.PlanCompiler;
import com.phaedrusxy.arcanesyntax.core.SpellPlan;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;

import java.lang.reflect.Method;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HexFormat;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Executable adapter contract tests using the original Build a Spell 1.0.3 JAR.
 * No gameplay classes, rules, or enum implementations are replaced by test doubles.
 * This does not launch Minecraft or prove that a Mixin was applied in a game.
 */
public final class ComponentCompatibilityTests {
    private static final String BAS_SHA256 =
            "b480ad587907c01b4f0e5e1f09b39b1c14d575cbd9b5798a9f59bc13cc61ed86";
    private static final String SHIELD_FIX_SHA256 =
            "36fde00acb09a73deb887d456ecfd5386f00ad5491c8fc5fb7e25688f8554210";
    private static int assertions;

    private record Part(Catalog.Kind kind, String id, int stacks) {}

    public static void main(String[] args) throws Exception {
        verifyOriginalDependency();
        testCatalogParity();
        testFullRuleMatrix();
        testKnownOutcomes();
        testEffectBinding();
        testStackExpansionAndPreservation();
        testAdapterBoundary();
        if (Boolean.getBoolean("arcaneSyntax.testShieldFix")) {
            testOriginalShieldFixHandler();
        } else {
            System.out.println("NOT RUN: Shield Fix handler check (set arcaneSyntax.testShieldFix=true with its original JAR on the classpath).");
        }
        System.out.println("PASS: " + assertions
                + " compatibility assertions using the original Build a Spell 1.0.3 dependency."
                + " Minecraft startup, Mixin application, inscription, and casting remain game checks.");
    }

    private static void ok(boolean condition, String message) {
        if (!condition) throw new AssertionError(message);
        assertions++;
    }

    private static void verifyOriginalDependency() throws Exception {
        Path ruleJar = Path.of(ModifierApplicability.class.getProtectionDomain()
                .getCodeSource().getLocation().toURI());
        ok(Files.isRegularFile(ruleJar), "Load the rule class from the original JAR, not a source fixture: " + ruleJar);
        String actual = HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256")
                .digest(Files.readAllBytes(ruleJar)));
        ok(BAS_SHA256.equals(actual), "Wrong Build a Spell artifact; expected released mc26.1.2 v1.0.3, got " + actual);
        for (Class<?> type : List.of(DeliveryMethod.class, SpellEffect.class, SpellModifier.class)) {
            ok(type.getProtectionDomain().getCodeSource().getLocation().equals(
                    ModifierApplicability.class.getProtectionDomain().getCodeSource().getLocation()),
                    "Enums and rules must come from the same original JAR: " + type.getName());
        }
    }

    private static void testCatalogParity() {
        Set<String> deliveries = Arrays.stream(DeliveryMethod.values())
                .map(DeliveryMethod::getSerializedName).collect(Collectors.toSet());
        Set<String> effects = Arrays.stream(SpellEffect.values())
                .map(SpellEffect::getSerializedName).collect(Collectors.toSet());
        Set<String> modifiers = Arrays.stream(SpellModifier.values())
                .map(SpellModifier::getSerializedName).collect(Collectors.toSet());
        ok(deliveries.size() == 7 && effects.size() == 47 && modifiers.size() == 22,
                "Version-pinned audit must contain 7 deliveries, 47 effects, and 22 modifiers");
        for (Catalog.Kind kind : Catalog.Kind.values()) {
            Set<String> actual = Catalog.entries().stream().filter(e -> e.kind() == kind)
                    .map(Catalog.Entry::id).collect(Collectors.toSet());
            Set<String> expected = switch (kind) {
                case DELIVERY -> deliveries;
                case EFFECT -> effects;
                case MODIFIER -> modifiers;
            };
            ok(actual.equals(expected), "Catalog IDs match dependency for " + kind);
        }
        for (SpellModifier modifier : SpellModifier.values()) {
            Catalog.Entry entry = Catalog.find(Catalog.NAMESPACE + ":modifier/"
                    + modifier.getSerializedName()).orElseThrow();
            ok(entry.stackable() == modifier.isStackable(),
                    "Stackability matches dependency for " + modifier);
        }
    }

    /**
     * Compare complete native-node compilation plus adapter validation with the dependency's
     * rule. This checks ID mapping, modifier scope, and preservation across all combinations;
     * it is not an independent proof that upstream gameplay implements every allowed rule.
     */
    private static void testFullRuleMatrix() {
        int combinations = 0;
        int accepted = 0;
        for (DeliveryMethod delivery : DeliveryMethod.values()) {
            for (SpellEffect effect : SpellEffect.values()) {
                for (SpellModifier modifier : SpellModifier.values()) {
                    SpellPlan plan = compile(delivery.getSerializedName(),
                            effect(effect.getSerializedName()), modifier(modifier.getSerializedName()));
                    boolean expected = ModifierApplicability.isDeliveryLevel(modifier)
                            ? ModifierApplicability.isDeliveryModifierUseful(modifier, delivery)
                            : ModifierApplicability.isUseful(modifier, effect, delivery);
                    boolean actual = accepts(plan);
                    ok(actual == expected, "Compiler/adapter disagrees with dependency for "
                            + delivery + " / " + effect + " / " + modifier);
                    ok(plan.apiComponents().equals(List.of(effect.getSerializedName(), modifier.getSerializedName())),
                            "Validation preserves original component IDs and order");
                    if (actual) accepted++;
                    combinations++;
                }
            }
        }
        ok(combinations == 7238, "All 7,238 delivery/effect/modifier triples covered");
        ok(accepted == 2821, "Untransformed upstream v1.0.3 matrix has 2,821 allowed triples");
        System.out.println("MATRIX: " + combinations + " checked; " + accepted + " allowed; "
                + (combinations - accepted) + " rejected (original upstream rule, before Mixin application).");
    }

    /** Independent canaries catch a wrongly loaded version or a check that accepts everything. */
    private static void testKnownOutcomes() {
        allowed("self", "shield", "increased_area");
        denied("self", "shield", "increased_power");
        denied("self", "shield", "prolonged");
        allowed("self", "teleport", "increased_area");
        denied("self", "teleport", "increased_power");
        allowed("self", "blink", "increased_power");
        denied("self", "blink", "increased_area");
        allowed("cast", "conjure", "wall");
        allowed("cast", "conjure", "floor");
        allowed("cast", "conjure", "fill");
        denied("cast", "conjure", "increased_power");
        allowed("cast", "damage", "leech");
        allowed("cast", "damage", "sunder");
        denied("self", "heal", "leech");
        denied("self", "heal", "sunder");
        allowed("self", "night_vision", "prolonged");
        denied("self", "night_vision", "increased_power");
        for (String id : List.of("double", "split", "accelerate", "pierce", "bounce", "return", "chain")) {
            denied("self", "shield", id);
            denied("sight", "damage", id);
            allowed("cast", "shield", id);
            allowed("tracking", "damage", id);
        }
        for (String id : List.of("duration", "delay", "echo", "linger")) {
            for (DeliveryMethod delivery : DeliveryMethod.values()) {
                allowed(delivery.getSerializedName(), "mark", id);
                allowed(delivery.getSerializedName(), "shield", id);
            }
        }
    }

    private static void testEffectBinding() {
        ok(accepts(compile("self", effect("shield"), modifier("increased_area"),
                effect("damage"), modifier("increased_power"))),
                "Each effect-bound modifier uses the effect immediately preceding its group");
        ok(!accepts(compile("self", effect("damage"), effect("shield"), modifier("increased_power"))),
                "An earlier compatible effect cannot legitimize a modifier on Shield");
        ok(accepts(compile("self", effect("damage"), modifier("increased_power"), effect("shield"))),
                "A later Shield does not steal a modifier from Damage");
        ok(!accepts(compile("self", effect("shield"), modifier("increased_power"), effect("damage"))),
                "A later compatible effect cannot rescue an invalid earlier group");
        ok(accepts(compile("cast", effect("shield"), modifier("pierce"), effect("damage"),
                modifier("echo"), modifier("increased_power"))),
                "Delivery modifiers do not change the current effect binding");
        ok(!accepts(compile("cast", effect("damage"), effect("shield"), modifier("echo"),
                modifier("increased_power"))),
                "A universal modifier between Shield and Power does not make Power useful");
        ok(!accepts(compile("self", effect("damage"), modifier("pierce"), effect("heal"))),
                "A projectile modifier is checked against delivery regardless of effect position");
    }

    private static void testStackExpansionAndPreservation() {
        SpellPlan separate = compile("self", effect("damage"), modifier("increased_power"),
                modifier("increased_power"), modifier("increased_power"));
        SpellPlan stacked = compile("self", effect("damage"),
                new Part(Catalog.Kind.MODIFIER, "increased_power", 3));
        ok(separate.equals(stacked), "Three modifier nodes and one three-stack node compile identically");
        List<SpellPlan.Instruction> before = new ArrayList<>(stacked.instructions());
        ComponentCompatibility.validate(stacked);
        ComponentCompatibility.validate(stacked);
        ok(stacked.instructions().equals(before), "Repeated validation is deterministic and read-only");
        SpellPlan invalid = compile("self", effect("shield"),
                new Part(Catalog.Kind.MODIFIER, "increased_power", 3));
        List<String> invalidBefore = invalid.apiComponents();
        ok(!accepts(invalid), "Shield with three Increased Power stacks is rejected");
        ok(invalid.apiComponents().equals(invalidBefore), "Rejected spells retain every original component");
        ok(invalid.apiComponents().equals(List.of("shield", "increased_power", "increased_power", "increased_power")),
                "No silent stripping of paid-for modifiers");
        ok(accepts(compile("cast", new Part(Catalog.Kind.EFFECT, "damage", 3),
                new Part(Catalog.Kind.MODIFIER, "increased_power", 3))),
                "Repeated effects and repeated compatible modifiers preserve their established order");
    }

    private static void testAdapterBoundary() {
        ok(accepts(new SpellPlan("self", List.of())),
                "Delivery-only drafts remain usable while the player is building an effect chain");
        ok(!accepts(new SpellPlan("made_up", List.of())), "Unknown delivery is rejected");
        ok(!accepts(new SpellPlan("self", List.of(new SpellPlan.Instruction(Catalog.Kind.EFFECT, "made_up")))),
                "Unknown effect is rejected");
        ok(!accepts(new SpellPlan("self", List.of(
                new SpellPlan.Instruction(Catalog.Kind.EFFECT, "shield"),
                new SpellPlan.Instruction(Catalog.Kind.MODIFIER, "made_up")))),
                "Unknown modifier is rejected");
        ok(!accepts(new SpellPlan("self", List.of(
                new SpellPlan.Instruction(Catalog.Kind.MODIFIER, "increased_power")))),
                "Effect-specific modifier requires an effect even if grammar checks were bypassed");
        ok(!accepts(new SpellPlan("self", List.of(
                new SpellPlan.Instruction(Catalog.Kind.DELIVERY, "cast")))),
                "A second delivery cannot masquerade as an instruction");
    }

    /**
     * Optional, separate test of the original Fix handler. Calling a handler is NOT equivalent
     * to starting Mixin and does not make the preceding untransformed matrix a patched run.
     */
    private static void testOriginalShieldFixHandler() throws Exception {
        Class<?> type = Class.forName("com.phaedrusxy.basshieldfix.mixin.ModifierApplicabilityMixin");
        Path fixJar = Path.of(type.getProtectionDomain().getCodeSource().getLocation().toURI());
        ok(Files.isRegularFile(fixJar), "Load the Fix handler from the original JAR");
        String hash = HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256")
                .digest(Files.readAllBytes(fixJar)));
        ok(SHIELD_FIX_SHA256.equals(hash), "Use the verified original Build A Spell Fix 1.1.2 artifact");
        Method handler = type.getDeclaredMethod("basShieldFix$noFillOnRemoval",
                SpellModifier.class, SpellEffect.class, DeliveryMethod.class, CallbackInfoReturnable.class);
        handler.setAccessible(true);
        int cancellations = 0;
        for (DeliveryMethod delivery : DeliveryMethod.values()) {
            for (SpellEffect effect : SpellEffect.values()) {
                for (SpellModifier modifier : SpellModifier.values()) {
                    CallbackInfoReturnable<Boolean> result = new CallbackInfoReturnable<>("isUseful", true);
                    handler.invoke(null, modifier, effect, delivery, result);
                    boolean expected = modifier == SpellModifier.FILL
                            && (effect == SpellEffect.BREAK || effect == SpellEffect.EVAPORATE_WATER);
                    ok(result.isCancelled() == expected, "Fix handler changes only Fill + removal effects");
                    if (result.isCancelled()) {
                        ok(Boolean.FALSE.equals(result.getReturnValue()), "Fix handler rejects the pair");
                        cancellations++;
                    }
                }
            }
        }
        ok(cancellations == 14, "Two Fill/removal pairs rejected across all seven deliveries");
        System.out.println("FIX HANDLER: original handler checked across 7,238 triples; 14 cancellations."
                + " Mixin injection into a running game was not tested.");
    }

    private static Part effect(String id) { return new Part(Catalog.Kind.EFFECT, id, 1); }
    private static Part modifier(String id) { return new Part(Catalog.Kind.MODIFIER, id, 1); }

    private static SpellPlan compile(String delivery, Part... parts) {
        PlanCompiler.Node next = null;
        for (int index = parts.length - 1; index >= 0; index--) {
            Part part = parts[index];
            String kind = part.kind() == Catalog.Kind.EFFECT ? "effect" : "modifier";
            next = new PlanCompiler.Node(Catalog.NAMESPACE + ":" + kind + "/" + part.id(),
                    part.stacks(), next == null ? List.of() : List.of(next));
        }
        PlanCompiler.Node deliveryNode = new PlanCompiler.Node(Catalog.NAMESPACE + ":delivery/" + delivery,
                1, next == null ? List.of() : List.of(next));
        return PlanCompiler.compile(new PlanCompiler.Node(PlanCompiler.ORIGIN, 1, List.of(deliveryNode)), 100);
    }

    private static boolean accepts(SpellPlan plan) {
        try {
            ComponentCompatibility.validate(plan);
            return true;
        } catch (IllegalArgumentException expected) {
            return false;
        }
    }

    private static void allowed(String delivery, String effect, String modifier) {
        ok(accepts(compile(delivery, effect(effect), modifier(modifier))),
                "Expected allowed: " + delivery + " / " + effect + " / " + modifier);
    }

    private static void denied(String delivery, String effect, String modifier) {
        ok(!accepts(compile(delivery, effect(effect), modifier(modifier))),
                "Expected rejected: " + delivery + " / " + effect + " / " + modifier);
    }
}
