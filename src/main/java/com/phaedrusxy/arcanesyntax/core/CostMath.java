package com.phaedrusxy.arcanesyntax.core;

/** Currency conversion only; native Thaumaturge code applies actual cap and equipment discounts. */
public final class CostMath {
    private CostMath() {}
    public static float vis(float rawManaCost, double visPerMana, double minimumVis) {
        if (!Float.isFinite(rawManaCost) || rawManaCost < 0 || !Double.isFinite(visPerMana)
                || visPerMana <= 0 || !Double.isFinite(minimumVis) || minimumVis < 0)
            throw new IllegalArgumentException("Non-finite or negative spell cost.");
        double raw = Math.max(minimumVis, rawManaCost * visPerMana);
        // Bound before float-to-int conversion in Thaumaturge's payment code.
        if (!Double.isFinite(raw) || raw > 1_000_000.0) throw new IllegalArgumentException("Spell cost exceeds the prototype safety bound.");
        return Math.round(raw * 100.0) / 100.0f;
    }
    public static int centivis(float vis) {
        if (!Float.isFinite(vis) || vis < 0 || vis > 1_000_000.0f)
            throw new IllegalArgumentException("Invalid Vis charge.");
        return Math.round(vis * 100.0f);
    }
}
