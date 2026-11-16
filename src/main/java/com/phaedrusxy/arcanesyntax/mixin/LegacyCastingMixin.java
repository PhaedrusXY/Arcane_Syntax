package com.phaedrusxy.arcanesyntax.mixin;
import com.phaedrusxy.arcanesyntax.IntegrationConfig;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.*;

import buildaspell.spell.Spell;
import net.minecraft.world.entity.player.Player;
import net.minecraft.server.level.ServerPlayer;
import com.phaedrusxy.arcanesyntax.bridge.SyntaxBridge;
@Mixin(targets="buildaspell.spell.execution.SpellExecutor",remap=false)
public abstract class LegacyCastingMixin {
    @Inject(method="executeSpell(Lnet/minecraft/world/entity/player/Player;Lbuildaspell/spell/Spell;Z)Z",at=@At("HEAD"),cancellable=true,require=1)
    private static void syntax$nativeWandsOnly(Player player, Spell spell, boolean consumeMana, CallbackInfoReturnable<Boolean> cir) {
        if(IntegrationConfig.disableLegacy() && consumeMana) {
            if(player instanceof ServerPlayer sp) SyntaxBridge.refuse(sp,"Inscribe a focus in the Focal Manipulator and cast it from a Thaumaturge wand.");
            cir.setReturnValue(false);
        }
    }
}
