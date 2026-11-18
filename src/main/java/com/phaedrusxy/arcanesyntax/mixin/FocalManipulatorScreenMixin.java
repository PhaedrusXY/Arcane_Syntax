package com.phaedrusxy.arcanesyntax.mixin;

import com.leclowndu93150.thaumaturge.api.spell.part.SpellPart;
import com.leclowndu93150.thaumaturge.client.screen.casters.focal.DraftHost;
import com.leclowndu93150.thaumaturge.client.screen.casters.focal.PartPalette;
import com.leclowndu93150.thaumaturge.client.screen.casters.focal.Selection;
import com.phaedrusxy.arcanesyntax.bridge.SyntaxBridge;
import com.phaedrusxy.arcanesyntax.client.SyntaxPalette;
import com.phaedrusxy.arcanesyntax.core.Catalog;
import net.minecraft.resources.ResourceKey;
import org.spongepowered.asm.mixin.Final;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

/** Refresh contextual choices as the native draft or insertion position changes. */
@Mixin(targets = "com.leclowndu93150.thaumaturge.client.screen.casters.focal.FocalManipulatorScreen", remap = false)
public abstract class FocalManipulatorScreenMixin {
    @Shadow @Final private PartPalette palette;

    @Inject(method = "refresh", at = @At("RETURN"), require = 1)
    private void syntax$refreshPalette(CallbackInfo ci) {
        palette.refresh();
    }

    @Inject(method = "select", at = @At("RETURN"), require = 1)
    private void syntax$refreshSelection(Selection selection, CallbackInfo ci) {
        palette.refresh();
    }

    @Inject(method = "place", at = @At("HEAD"), cancellable = true, require = 1)
    private void syntax$checkPlacement(ResourceKey<SpellPart> key, CallbackInfo ci) {
        String id = key.identifier().toString();
        if (!Catalog.isSyntax(id)) return;
        DraftHost host = (DraftHost) (Object) this;
        boolean allowed = Catalog.find(id).map(entry -> SyntaxBridge.available(host.player(), entry)
                && SyntaxPalette.compatiblePlacement(host, key)).orElse(false);
        if (!allowed) ci.cancel();
    }
}
