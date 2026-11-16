package com.phaedrusxy.arcanesyntax.mixin;
import com.phaedrusxy.arcanesyntax.IntegrationConfig;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.*;

import net.minecraft.resources.Identifier;
import net.minecraft.world.item.ItemStack;
import com.leclowndu93150.thaumaturge.content.wands.ItemWand;
@Mixin(targets="buildaspell.block.entity.ArcaneAltarBlockEntity",remap=false)
public abstract class ArcaneAltarMixin {
    @Inject(method="isValidEnchantTarget",at=@At("HEAD"),cancellable=true,require=1)
    private static void syntax$powerOnly(Identifier id,ItemStack stack,CallbackInfoReturnable<Boolean> cir) {
        if(!IntegrationConfig.disableLegacy() || id==null)return;
        String name=id.toString();
        if(name.equals("buildaspell:mana_pool") || name.equals("buildaspell:mana_regeneration")) cir.setReturnValue(false);
        else if(name.equals("buildaspell:spell_power") && stack.getItem() instanceof ItemWand) cir.setReturnValue(true);
    }
    @Inject(method="isEnchantableTarget",at=@At("HEAD"),cancellable=true,require=1)
    private static void syntax$acceptWands(ItemStack stack,CallbackInfoReturnable<Boolean> cir) {
        if(IntegrationConfig.disableLegacy() && stack.getItem() instanceof ItemWand)cir.setReturnValue(true);
    }
}
