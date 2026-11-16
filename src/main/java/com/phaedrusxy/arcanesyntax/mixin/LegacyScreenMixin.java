package com.phaedrusxy.arcanesyntax.mixin;
import com.phaedrusxy.arcanesyntax.IntegrationConfig;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(targets="buildaspell.client.ClientScreenOpener",remap=false)
public abstract class LegacyScreenMixin {
    @Inject(method="openSpellBuilder",at=@At("HEAD"),cancellable=true,require=1)
    private static void syntax$noSeparateEditor(CallbackInfo ci) {if(IntegrationConfig.disableLegacy())ci.cancel();}
}
