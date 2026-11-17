package com.phaedrusxy.arcanesyntax;

import net.neoforged.bus.api.IEventBus;
import net.neoforged.fml.ModContainer;
import net.neoforged.fml.common.Mod;
import net.neoforged.fml.config.ModConfig;

/** Separate addon; registers no replacement items and never edits other mods' configuration. */
@Mod(ArcaneSyntaxUnified.ID)
public final class ArcaneSyntaxUnified {
    public static final String ID = "arcane_syntax_unified";
    public static final System.Logger LOG = System.getLogger(ID);
    public ArcaneSyntaxUnified(IEventBus modBus, ModContainer container) {
        container.registerConfig(ModConfig.Type.SERVER, IntegrationConfig.SPEC, "arcane-syntax-unified-server.toml");
        LOG.log(System.Logger.Level.INFO,
                "Arcane Syntax 0.2.2 compatibility test: native focus bridge for Thaumaturge 1.1.0 / Build a Spell 1.0.3");
    }
}
