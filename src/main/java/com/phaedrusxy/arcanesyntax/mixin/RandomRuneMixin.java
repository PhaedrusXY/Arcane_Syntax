package com.phaedrusxy.arcanesyntax.mixin;
import com.phaedrusxy.arcanesyntax.IntegrationConfig;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.*;

import net.minecraft.world.InteractionResult;
@Mixin(targets="buildaspell.item.SpellRuneItem",remap=false)
public abstract class RandomRuneMixin {
    @Inject(method="use",at=@At("HEAD"),cancellable=true,require=1)
    private void syntax$noRandomKnowledge(CallbackInfoReturnable<InteractionResult> cir) {
        if(IntegrationConfig.disableLegacy())cir.setReturnValue(InteractionResult.FAIL);
    }
}
