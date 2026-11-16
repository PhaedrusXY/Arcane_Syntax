package com.phaedrusxy.arcanesyntax.core;
import java.util.*;
/** Pack's three-tier vocabulary, generated from its supplied 75-rune registry plus Cast. */
public final class TierRules {
    private static final Map<String,Integer> TIERS;
    static {
        Map<String,Integer> tiers = new LinkedHashMap<>();
        tiers.put("delivery/cast", 1);
        tiers.put("delivery/rune", 2);
        tiers.put("delivery/self", 1);
        tiers.put("delivery/sight", 2);
        tiers.put("delivery/touch", 1);
        tiers.put("delivery/tracking", 2);
        tiers.put("delivery/trap", 2);
        tiers.put("effect/blind", 2);
        tiers.put("effect/blink", 2);
        tiers.put("effect/break", 1);
        tiers.put("effect/charm", 2);
        tiers.put("effect/cleanse", 1);
        tiers.put("effect/conjure", 1);
        tiers.put("effect/create_water", 1);
        tiers.put("effect/damage", 1);
        tiers.put("effect/evaporate_water", 1);
        tiers.put("effect/explosion", 3);
        tiers.put("effect/freeze", 1);
        tiers.put("effect/grapple", 1);
        tiers.put("effect/growth", 1);
        tiers.put("effect/gust", 1);
        tiers.put("effect/haste", 2);
        tiers.put("effect/heal", 2);
        tiers.put("effect/ignite", 1);
        tiers.put("effect/invisibility", 2);
        tiers.put("effect/launch", 3);
        tiers.put("effect/levitation", 3);
        tiers.put("effect/light", 1);
        tiers.put("effect/lightning", 3);
        tiers.put("effect/mark", 2);
        tiers.put("effect/night_vision", 1);
        tiers.put("effect/pickup", 1);
        tiers.put("effect/poison", 2);
        tiers.put("effect/pull", 1);
        tiers.put("effect/push", 1);
        tiers.put("effect/reap", 1);
        tiers.put("effect/recall", 2);
        tiers.put("effect/regenerate", 2);
        tiers.put("effect/resist", 2);
        tiers.put("effect/root", 2);
        tiers.put("effect/saturation", 1);
        tiers.put("effect/shield", 2);
        tiers.put("effect/slam", 3);
        tiers.put("effect/slow", 1);
        tiers.put("effect/slow_fall", 1);
        tiers.put("effect/speed", 1);
        tiers.put("effect/strengthen", 1);
        tiers.put("effect/summon", 3);
        tiers.put("effect/swap", 2);
        tiers.put("effect/teleport", 3);
        tiers.put("effect/water_breathing", 1);
        tiers.put("effect/weaken", 1);
        tiers.put("effect/wither", 3);
        tiers.put("effect/yeet", 2);
        tiers.put("modifier/accelerate", 2);
        tiers.put("modifier/bounce", 2);
        tiers.put("modifier/chain", 3);
        tiers.put("modifier/delay", 2);
        tiers.put("modifier/double", 3);
        tiers.put("modifier/duration", 3);
        tiers.put("modifier/echo", 3);
        tiers.put("modifier/fill", 2);
        tiers.put("modifier/floor", 1);
        tiers.put("modifier/fortunate_son", 3);
        tiers.put("modifier/gentleness", 1);
        tiers.put("modifier/increased_area", 2);
        tiers.put("modifier/increased_power", 2);
        tiers.put("modifier/leech", 2);
        tiers.put("modifier/linger", 3);
        tiers.put("modifier/nullify", 2);
        tiers.put("modifier/pierce", 2);
        tiers.put("modifier/prolonged", 2);
        tiers.put("modifier/return", 2);
        tiers.put("modifier/split", 3);
        tiers.put("modifier/sunder", 2);
        tiers.put("modifier/wall", 1);
        TIERS = Collections.unmodifiableMap(tiers);
    }
    private TierRules() {}
    public static int componentTier(Catalog.Entry e) {
        Integer tier = TIERS.get(e.kind().name().toLowerCase(Locale.ROOT) + "/" + e.id());
        if (tier == null) throw new IllegalArgumentException("No progression tier for " + e.partId());
        return tier;
    }
    public static int requiredTier(SpellPlan plan) {
        int result = componentTier(Catalog.find(Catalog.NAMESPACE + ":delivery/" + plan.delivery()).orElseThrow());
        for (SpellPlan.Instruction i : plan.instructions()) {
            Catalog.Entry e = Catalog.find(Catalog.NAMESPACE + ":" + i.kind().name().toLowerCase(Locale.ROOT) + "/" + i.id()).orElseThrow();
            result = Math.max(result, componentTier(e));
        }
        return result;
    }
    public static String focusName(int tier) {
        return switch(tier) { case 1 -> "Lesser Focus (Foundation)"; case 2 -> "Advanced Focus (Structured)";
            case 3 -> "Greater Focus (Infused)"; default -> "supported Thaumaturge focus"; };
    }
    public static void requireTier(SpellPlan plan, int available) {
        int needed = requiredTier(plan);
        if (available < needed) throw new IllegalArgumentException("This spell requires a " + focusName(needed) + ".");
    }
    public static void validateCombinations(SpellPlan plan) {
        boolean breaking = false, fill = false;
        for (SpellPlan.Instruction i : plan.instructions()) {
            breaking |= i.kind() == Catalog.Kind.EFFECT && i.id().equals("break");
            fill |= i.kind() == Catalog.Kind.MODIFIER && i.id().equals("fill");
        }
        if (breaking && fill) throw new IllegalArgumentException("Break and Fill cannot be combined. Use Increased Area for excavation.");
    }
}
