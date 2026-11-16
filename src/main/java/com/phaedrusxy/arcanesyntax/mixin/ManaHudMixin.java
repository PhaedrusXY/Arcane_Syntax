package com.phaedrusxy.arcanesyntax.mixin;
import com.phaedrusxy.arcanesyntax.IntegrationConfig;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(targets="buildaspell.client.gui.ManaBarOverlay",remap=false)
public abstract class ManaHudMixin {
    @Inject(method="render",at=@At("HEAD"),cancellable=true,require=1)
    private void syntax$hideUnusedPool(CallbackInfo ci) {if(IntegrationConfig.hideMana())ci.cancel();}
    @Inject(method="isVisible",at=@At("HEAD"),cancellable=true,require=1)
    private static void syntax$hidden(CallbackInfoReturnable<Boolean> cir) {if(IntegrationConfig.hideMana())cir.setReturnValue(false);}
}
