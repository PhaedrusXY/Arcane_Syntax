package com.phaedrusxy.arcanesyntax.mixin;
import com.phaedrusxy.arcanesyntax.IntegrationConfig;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.*;

import buildaspell.client.ModKeyBinds;
import net.minecraft.client.KeyMapping;
@Mixin(targets="buildaspell.client.KeyInputHandler",remap=false)
public abstract class LegacyControlsMixin {
    @Inject(method="handleKeyInput",at=@At("HEAD"),cancellable=true,require=1)
    private static void syntax$focusControls(CallbackInfo ci) {
        if(IntegrationConfig.disableLegacy()) {
            for(KeyMapping key:ModKeyBinds.ALL_KEYS) while(key.consumeClick()) { /* drain retired shortcuts */ }
            ci.cancel();
        }
    }
}
