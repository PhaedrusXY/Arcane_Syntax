package com.phaedrusxy.arcanesyntax.mixin;

import com.leclowndu93150.thaumaturge.api.spell.*;
import com.phaedrusxy.arcanesyntax.bridge.SyntaxBridge;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.InteractionResult;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.Level;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;

@Mixin(targets = "com.leclowndu93150.thaumaturge.content.spell.casting.SpellCasting", remap = false)
public abstract class SpellCastingMixin {
    @Inject(method = "cast", at = @At("HEAD"), cancellable = true, require = 1)
    private static void syntax$cast(Player player, ItemStack wand, ItemStack focus, Spell spell,
                                    SpellSummary summary, float power, float share,
                                    CallbackInfoReturnable<Boolean> cir) {
        if (SyntaxBridge.containsSyntax(spell))
            cir.setReturnValue(SyntaxBridge.cast(player, wand, focus, spell, summary, power, share));
    }
    @Inject(method = "use", at = @At("HEAD"), cancellable = true, require = 1)
    private static void syntax$instantOnly(Level level, Player player, InteractionHand hand, ItemStack wand,
                                          ItemStack focus, CallbackInfoReturnable<InteractionResult> cir) {
        Spell spell = Spells.spellOf(focus);
        if (SyntaxBridge.containsSyntax(spell) && player instanceof ServerPlayer serverPlayer) {
            String problem=SyntaxBridge.useProblem(player,wand,focus,spell);
            if(problem!=null) {
                SyntaxBridge.refuse(serverPlayer,problem);
                cir.setReturnValue(InteractionResult.FAIL);
            }
        }
    }
}
