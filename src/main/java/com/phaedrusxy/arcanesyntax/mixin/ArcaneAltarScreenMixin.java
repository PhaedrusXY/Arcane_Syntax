package com.phaedrusxy.arcanesyntax.mixin;
import com.phaedrusxy.arcanesyntax.IntegrationConfig;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.*;

import org.spongepowered.asm.mixin.Shadow;
import net.minecraft.client.gui.components.Button;
import net.minecraft.resources.Identifier;
@Mixin(targets="buildaspell.client.gui.ArcaneAltarScreen",remap=false)
public abstract class ArcaneAltarScreenMixin {
    @Shadow private Button manaPoolBtn;
    @Shadow private Button manaRegenBtn;
    @Shadow private Button helpBtn;
    @Shadow private Identifier selectedEnchantment;
    @Shadow private boolean showHelp;
    @Inject(method={"init","containerTick"},at=@At("RETURN"),require=1)
    private void syntax$powerOnly(CallbackInfo ci) {
        if(!IntegrationConfig.disableLegacy())return;
        if(manaPoolBtn!=null){manaPoolBtn.visible=false;manaPoolBtn.active=false;}
        if(manaRegenBtn!=null){manaRegenBtn.visible=false;manaRegenBtn.active=false;}
        if(helpBtn!=null)helpBtn.visible=false; // stock help explains the retired mana economy
        showHelp=false;
        selectedEnchantment=Identifier.fromNamespaceAndPath("buildaspell","spell_power");
    }
}
