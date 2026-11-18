package com.phaedrusxy.arcanesyntax.bridge;

import buildaspell.spell.DeliveryMethod;
import buildaspell.spell.ModifierApplicability;
import buildaspell.spell.SpellEffect;
import buildaspell.spell.SpellModifier;
import com.phaedrusxy.arcanesyntax.core.Catalog;
import com.phaedrusxy.arcanesyntax.core.SpellPlan;
import java.util.Locale;

/**
 * Semantic validation against the loaded Build a Spell 1.0.3 rules.
 *
 * <p>This deliberately calls the same methods as the BaS editor instead of keeping a second
 * compatibility table. In particular, the installed Build A Spell Fix can change isUseful via
 * Mixin. ModifierApplicability is version-specific; it is not BaS's stable integration facade.
 * Pure grammar, learning, configuration switches, and pack restrictions are checked separately.
 */
public final class ComponentCompatibility {
    private ComponentCompatibility() {}

    /** Accepts an ordered plan, including a delivery-only editor draft; never changes the plan. */
    public static void validate(SpellPlan plan) {
        DeliveryMethod delivery = DeliveryMethod.fromId(plan.delivery());
        if (delivery == null) throw new IllegalArgumentException("Unknown delivery: " + plan.delivery());
        SpellEffect effect = null;
        for (SpellPlan.Instruction instruction : plan.instructions()) {
            if (instruction.kind() == Catalog.Kind.EFFECT) {
                effect = SpellEffect.fromId(instruction.id());
                if (effect == null) throw new IllegalArgumentException("Unknown effect: " + instruction.id());
            } else if (instruction.kind() == Catalog.Kind.MODIFIER) {
                SpellModifier modifier = SpellModifier.fromId(instruction.id());
                if (modifier == null) throw new IllegalArgumentException("Unknown modifier: " + instruction.id());
                if (ModifierApplicability.isDeliveryLevel(modifier)) {
                    // BaS moves these to its delivery roster. Their position beside an effect
                    // does not make them effect-specific (e.g. Pierce requires Cast/Tracking).
                    if (!ModifierApplicability.isDeliveryModifierUseful(modifier, delivery)) {
                        throw new IllegalArgumentException(label(instruction.id()) + " is not supported with "
                                + label(plan.delivery()) + " delivery. Change the delivery or remove this modifier.");
                    }
                } else {
                    if (effect == null) throw new IllegalArgumentException("Place modifiers after an effect.");
                    if (!ModifierApplicability.isUseful(modifier, effect, delivery)) {
                        throw new IllegalArgumentException(label(instruction.id()) + " cannot modify "
                                + label(effect.getSerializedName()) + " with " + label(plan.delivery())
                                + " delivery. Remove it or place it after a compatible effect.");
                    }
                }
            } else {
                throw new IllegalArgumentException("Only the first node may be a delivery.");
            }
        }
    }

    private static String label(String id) {
        String[] words = id.split("_");
        for (int i = 0; i < words.length; i++) {
            if (!words[i].isEmpty()) words[i] = words[i].substring(0, 1).toUpperCase(Locale.ROOT) + words[i].substring(1);
        }
        return String.join(" ", words);
    }
}
