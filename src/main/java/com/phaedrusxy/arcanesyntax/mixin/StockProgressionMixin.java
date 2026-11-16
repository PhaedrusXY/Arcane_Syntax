package com.phaedrusxy.arcanesyntax.mixin;
import com.phaedrusxy.arcanesyntax.IntegrationConfig;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(targets="buildaspell.events.ServerEvents",remap=false)
public abstract class StockProgressionMixin {
    @Inject(method="grantStarterKit",at=@At("HEAD"),cancellable=true,require=1)
    private static void syntax$learnFromRunes(CallbackInfo ci) {if(IntegrationConfig.disableLegacy())ci.cancel();}
    @Inject(method="grantGuidebook",at=@At("HEAD"),cancellable=true,require=1)
    private static void syntax$useThaumonomicon(CallbackInfoReturnable<Boolean> cir) {if(IntegrationConfig.disableLegacy())cir.setReturnValue(true);}
}
