package com.phaedrusxy.arcanesyntax.mixin;

import com.leclowndu93150.thaumaturge.api.spell.part.SpellPart;
import com.leclowndu93150.thaumaturge.client.screen.casters.focal.DraftHost;
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
import java.util.List;

/** Client presentation only. Server-side analysis independently validates the complete spell. */
@Mixin(targets = "com.leclowndu93150.thaumaturge.client.screen.casters.focal.PartPalette", remap = false)
public abstract class PartPaletteMixin {
    @Shadow @Final private DraftHost host;
    @Shadow private List<ResourceKey<SpellPart>> entries;
    @Shadow private int scroll;
    @Inject(method = "refresh", at = @At("RETURN"), require = 1)
    private void syntax$filterAvailable(CallbackInfo ci) {
        int previousSize = entries.size();
        entries = entries.stream().filter(key -> {
            String id = key.identifier().toString();
            if (!Catalog.isSyntax(id)) return true;
            return Catalog.find(id).map(entry -> SyntaxBridge.available(host.player(), entry)
                    && SyntaxPalette.compatiblePlacement(host, key)).orElse(false);
        }).toList();
        if (entries.size() != previousSize) scroll = 0;
    }
}
