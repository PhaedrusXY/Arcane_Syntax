package com.phaedrusxy.arcanesyntax.bridge;
import buildaspell.config.ModConfig;
import buildaspell.item.WandTier;
import com.leclowndu93150.thaumaturge.api.spell.FocusTier;
import com.leclowndu93150.thaumaturge.api.spell.Spells;
import com.leclowndu93150.thaumaturge.content.wands.ItemWand;
import com.leclowndu93150.thaumaturge.registry.TTItems;
import com.phaedrusxy.arcanesyntax.IntegrationConfig;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;
/** Resolves actual native focus definitions, not hard-coded complexity thresholds. */
public final class FocusEquipment {
    private FocusEquipment() {}
    public static int rank(FocusTier tier) {
        if(tier==null) return 0;
        if(Spells.tierOf(new ItemStack(TTItems.FOCUS_3.get())).filter(tier::equals).isPresent()) return 3;
        if(Spells.tierOf(new ItemStack(TTItems.FOCUS_2.get())).filter(tier::equals).isPresent()) return 2;
        if(Spells.tierOf(new ItemStack(TTItems.FOCUS_1.get())).filter(tier::equals).isPresent()) return 1;
        return 0;
    }
    public static int rank(ItemStack focus) {return Spells.tierOf(focus).map(FocusEquipment::rank).orElse(0);}
    public static float heldPower(Player player) {
        if(!IntegrationConfig.preservePower()) return 0f;
        int best=0;
        for(InteractionHand hand:InteractionHand.values()) {
            ItemStack stack=player.getItemInHand(hand);
            if(stack.getItem() instanceof ItemWand wand) best=Math.max(best,rank(wand.getFocusStack(stack)));
        }
        WandTier tier=switch(best){case 1->WandTier.WORN;case 2->WandTier.CARVED;case 3->WandTier.RUNIC;default->null;};
        return tier==null?0f:(float)ModConfig.wandSpellPower(tier);
    }
}
