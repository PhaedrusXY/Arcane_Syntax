package com.phaedrusxy.arcanesyntax.mixin;
import com.phaedrusxy.arcanesyntax.IntegrationConfig;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.*;

import com.phaedrusxy.arcanesyntax.bridge.FocusEquipment;
import com.phaedrusxy.arcanesyntax.bridge.SyntaxBridge;
import net.minecraft.world.entity.player.Player;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.level.Level;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.InteractionResult;
@Mixin(targets="buildaspell.item.WandItem",remap=false)
public abstract class LegacyWandMixin {
    @Inject(method="use",at=@At("HEAD"),cancellable=true,require=1)
    private void syntax$retired(Level level,Player player,InteractionHand hand,CallbackInfoReturnable<InteractionResult> cir) {
        if(IntegrationConfig.disableLegacy()) {
            if(player instanceof ServerPlayer sp) SyntaxBridge.refuse(sp,"This legacy wand is retired. Use a Thaumaturge wand and an inscribed focus.");
            cir.setReturnValue(InteractionResult.FAIL);
        }
    }
    @Inject(method="heldSpellPowerBonus",at=@At("HEAD"),cancellable=true,require=1)
    private static void syntax$focusPower(Player player,CallbackInfoReturnable<Float> cir) {
        if(IntegrationConfig.disableLegacy()) cir.setReturnValue(FocusEquipment.heldPower(player));
    }
    @Inject(method="heldDiscountMultiplier",at=@At("HEAD"),cancellable=true,require=1)
    private static void syntax$noLegacyDiscount(Player player,CallbackInfoReturnable<Float> cir) {
        if(IntegrationConfig.disableLegacy()) cir.setReturnValue(1.0f);
    }
}
