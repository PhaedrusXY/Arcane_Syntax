package com.phaedrusxy.arcanesyntax;
import net.neoforged.neoforge.common.ModConfigSpec;
/** Server configuration is synchronized to clients; defaults fail closed before world entry. */
public final class IntegrationConfig {
    public static final ModConfigSpec SPEC;
    private static final ModConfigSpec.DoubleValue VIS_PER_MANA, MINIMUM_VIS;
    private static final ModConfigSpec.BooleanValue REQUIRE_LEARNING, LOG_CASTS, DISABLE_LEGACY, HIDE_MANA, ENFORCE_TIERS, PRESERVE_POWER, BLOCK_BREAK_FILL;
    static {
        var b = new ModConfigSpec.Builder();
        VIS_PER_MANA = b.comment("Raw BaS mana cost to total Vis; native wand discounts are applied exactly once afterward.").defineInRange("visPerMana",0.1,0.0001,100.0);
        MINIMUM_VIS = b.comment("Minimum undiscounted total Vis cost, not an additional fee.").defineInRange("minimumVis",0.1,0.0,100.0);
        REQUIRE_LEARNING = b.comment("Require permanent rune knowledge; Creative bypasses knowledge, not focus-tier or combination validation.").define("requireLearnedComponents",true);
        LOG_CASTS = b.comment("Log compiled casts, Vis receipts, and unchanged personal mana for diagnostics.").define("logCasts",false);
        DISABLE_LEGACY = b.comment("Retire BaS wands, slot-key casting, editor controls, starter/random rune progression, and mana enchanting. API calls with consumeMana=false remain available.").define("disableLegacyCasting",true);
        HIDE_MANA = b.comment("Hide BaS's unused personal mana HUD while legacy casting is disabled.").define("hideLegacyManaHud",true);
        ENFORCE_TIERS = b.comment("Foundation/Lesser, Structured/Advanced, Infused/Greater; enforced on analysis, inscription and use.").define("enforceFocusTiers",true);
        PRESERVE_POWER = b.comment("Transfer configured Worn/Carved/Runic spell-power bonuses to held Lesser/Advanced/Greater foci. No BaS mana discount is transferred.").define("preserveFocusPower",true);
        BLOCK_BREAK_FILL = b.comment("Reject Break + Fill anywhere in a composition before inscription/payment; Increased Area remains usable.").define("blockBreakFill",true);
        SPEC = b.build();
    }
    private IntegrationConfig() {}
    public static double visPerMana() { try {return VIS_PER_MANA.get();} catch(IllegalStateException e){return 0.1;} }
    public static double minimumVis() { try {return MINIMUM_VIS.get();} catch(IllegalStateException e){return 0.1;} }
    private static boolean read(ModConfigSpec.BooleanValue value, boolean fallback) { try{return value.get();}catch(IllegalStateException e){return fallback;} }
    public static boolean requireLearning(){return read(REQUIRE_LEARNING,true);}
    public static boolean logCasts(){return read(LOG_CASTS,false);}
    public static boolean disableLegacy(){return read(DISABLE_LEGACY,true);}
    public static boolean hideMana(){return disableLegacy() && read(HIDE_MANA,true);}
    public static boolean enforceTiers(){return read(ENFORCE_TIERS,true);}
    public static boolean preservePower(){return read(PRESERVE_POWER,true);}
    public static boolean blockBreakFill(){return read(BLOCK_BREAK_FILL,true);}
}
