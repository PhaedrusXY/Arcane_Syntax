package com.phaedrusxy.arcanesyntax.mixin;

import com.leclowndu93150.thaumaturge.api.spell.*;
import com.phaedrusxy.arcanesyntax.bridge.SyntaxBridge;
import net.minecraft.core.HolderLookup;
import net.minecraft.world.entity.player.Player;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;

@Mixin(targets = "com.leclowndu93150.thaumaturge.content.spell.engine.SpellAnalyzer", remap = false)
public abstract class SpellAnalyzerMixin {
    @Inject(method = "analyze", at = @At("RETURN"), cancellable = true, require = 1)
    private static void syntax$analyze(Spell spell, FocusTier tier, HolderLookup.Provider registries,
                                       Player player, CallbackInfoReturnable<SpellSummary> cir) {
        if (SyntaxBridge.containsSyntax(spell))
            cir.setReturnValue(SyntaxBridge.analyze(spell, tier, player, cir.getReturnValue()));
    }
}
