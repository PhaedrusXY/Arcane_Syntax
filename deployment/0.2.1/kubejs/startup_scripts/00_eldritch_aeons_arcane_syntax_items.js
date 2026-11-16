// Eldritch Aeons — Arcane Syntax crafted-rune registry v2.0.1 (three-tier grammar)
// Install on BOTH client and server. Startup scripts require a full restart.

(function() {
  // Foundation: basic effects including Conjure, simple delivery, Wall/Floor and Gentleness.
  // Structured: amplification, spatial expansion, controlled targeting and refinement.
  // Infused: exotic effects, propagation, persistence and multiplied instructions.
  // Registry IDs, order and recipe materials stay intact; research and learning agree.
  global.EA_ARCANE_SYNTAX_COMPONENTS = [
  {
    "kind": "delivery",
    "id": "self",
    "display": "Self",
    "tier": 1,
    "method": "arcane",
    "description": "Defines the caster as the spell’s target.",
    "recipe": {
      "ingredients": [
        "minecraft:name_tag",
        "minecraft:amethyst_shard"
      ],
      "vis": 8,
      "crystals": {
        "thaumaturge:ordo": 2
      }
    },
    "item": "kubejs:syntax_delivery_self",
    "recipe_id": "kubejs:inscribe_delivery_self",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "delivery",
    "id": "sight",
    "display": "Sight",
    "tier": 2,
    "method": "arcane",
    "description": "Addresses a spell to whatever the caster can clearly see.",
    "recipe": {
      "ingredients": [
        "minecraft:spyglass",
        "minecraft:glass",
        "minecraft:glow_ink_sac"
      ],
      "vis": 10,
      "crystals": {
        "thaumaturge:aer": 1,
        "thaumaturge:ordo": 2
      }
    },
    "item": "kubejs:syntax_delivery_sight",
    "recipe_id": "kubejs:inscribe_delivery_sight",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "delivery",
    "id": "touch",
    "display": "Touch",
    "tier": 1,
    "method": "arcane",
    "description": "Binds a spell to direct physical contact.",
    "recipe": {
      "ingredients": [
        "minecraft:leather",
        "minecraft:copper_ingot",
        "minecraft:redstone"
      ],
      "vis": 8,
      "crystals": {
        "thaumaturge:terra": 1,
        "thaumaturge:ordo": 1
      }
    },
    "item": "kubejs:syntax_delivery_touch",
    "recipe_id": "kubejs:inscribe_delivery_touch",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "damage",
    "display": "Damage",
    "tier": 1,
    "method": "arcane",
    "description": "Expresses direct harm without specifying an element.",
    "recipe": {
      "ingredients": [
        "minecraft:flint",
        "minecraft:iron_nugget",
        "minecraft:redstone"
      ],
      "vis": 8,
      "crystals": {
        "thaumaturge:perditio": 2
      }
    },
    "item": "kubejs:syntax_effect_damage",
    "recipe_id": "kubejs:inscribe_effect_damage",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "break",
    "display": "Break",
    "tier": 1,
    "method": "arcane",
    "description": "Unmakes the cohesion of ordinary blocks.",
    "recipe": {
      "ingredients": [
        "minecraft:iron_ingot",
        "minecraft:flint",
        "minecraft:stone_pickaxe"
      ],
      "vis": 10,
      "crystals": {
        "thaumaturge:terra": 2,
        "thaumaturge:perditio": 1
      }
    },
    "item": "kubejs:syntax_effect_break",
    "recipe_id": "kubejs:inscribe_effect_break",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "ignite",
    "display": "Ignite",
    "tier": 1,
    "method": "arcane",
    "description": "Introduces heat until matter catches fire.",
    "recipe": {
      "ingredients": [
        "minecraft:coal",
        "minecraft:fire_charge"
      ],
      "vis": 10,
      "crystals": {
        "thaumaturge:ignis": 2
      }
    },
    "item": "kubejs:syntax_effect_ignite",
    "recipe_id": "kubejs:inscribe_effect_ignite",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "freeze",
    "display": "Freeze",
    "tier": 1,
    "method": "arcane",
    "description": "Removes motion and heat in a tightly ordered pattern.",
    "recipe": {
      "ingredients": [
        "minecraft:snow_block",
        "minecraft:packed_ice"
      ],
      "vis": 12,
      "crystals": {
        "thaumaturge:aqua": 2,
        "thaumaturge:ordo": 1
      }
    },
    "item": "kubejs:syntax_effect_freeze",
    "recipe_id": "kubejs:inscribe_effect_freeze",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "pull",
    "display": "Pull",
    "tier": 1,
    "method": "arcane",
    "description": "Draws a target toward the spell’s center.",
    "recipe": {
      "ingredients": [
        "minecraft:fishing_rod",
        "minecraft:lead"
      ],
      "vis": 12,
      "crystals": {
        "thaumaturge:aer": 2,
        "thaumaturge:ordo": 1
      }
    },
    "item": "kubejs:syntax_effect_pull",
    "recipe_id": "kubejs:inscribe_effect_pull",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "push",
    "display": "Push",
    "tier": 1,
    "method": "arcane",
    "description": "Imparts force away from the spell’s center.",
    "recipe": {
      "ingredients": [
        "minecraft:piston",
        "minecraft:feather"
      ],
      "vis": 12,
      "crystals": {
        "thaumaturge:aer": 2,
        "thaumaturge:perditio": 1
      }
    },
    "item": "kubejs:syntax_effect_push",
    "recipe_id": "kubejs:inscribe_effect_push",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "heal",
    "display": "Heal",
    "tier": 2,
    "method": "arcane",
    "description": "Restores a living pattern toward its proper form.",
    "recipe": {
      "ingredients": [
        "minecraft:glistering_melon_slice",
        "minecraft:honey_bottle",
        "minecraft:gold_nugget"
      ],
      "vis": 15,
      "crystals": {
        "thaumaturge:aqua": 2,
        "thaumaturge:ordo": 2
      }
    },
    "item": "kubejs:syntax_effect_heal",
    "recipe_id": "kubejs:inscribe_effect_heal",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "light",
    "display": "Light",
    "tier": 1,
    "method": "arcane",
    "description": "Makes illumination persist without an ordinary flame.",
    "recipe": {
      "ingredients": [
        "minecraft:glowstone_dust",
        "minecraft:torch",
        "minecraft:amethyst_shard"
      ],
      "vis": 8,
      "crystals": {
        "thaumaturge:ignis": 1,
        "thaumaturge:aer": 1
      }
    },
    "item": "kubejs:syntax_effect_light",
    "recipe_id": "kubejs:inscribe_effect_light",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "slow_fall",
    "display": "Slow Fall",
    "tier": 1,
    "method": "arcane",
    "description": "Softens the downward claim of gravity.",
    "recipe": {
      "ingredients": [
        "minecraft:phantom_membrane",
        "minecraft:feather",
        "minecraft:feather"
      ],
      "vis": 12,
      "crystals": {
        "thaumaturge:aer": 3
      }
    },
    "item": "kubejs:syntax_effect_slow_fall",
    "recipe_id": "kubejs:inscribe_effect_slow_fall",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "create_water",
    "display": "Create Water",
    "tier": 1,
    "method": "arcane",
    "description": "Condenses ambient moisture into usable water.",
    "recipe": {
      "ingredients": [
        "minecraft:glass_bottle",
        "minecraft:kelp",
        "minecraft:blue_dye"
      ],
      "vis": 10,
      "crystals": {
        "thaumaturge:aqua": 3
      }
    },
    "item": "kubejs:syntax_effect_create_water",
    "recipe_id": "kubejs:inscribe_effect_create_water",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "evaporate_water",
    "display": "Evaporate Water",
    "tier": 1,
    "method": "arcane",
    "description": "Disperses water into heat and vapor.",
    "recipe": {
      "ingredients": [
        "minecraft:sponge",
        "minecraft:magma_cream",
        "minecraft:fire_charge"
      ],
      "vis": 15,
      "crystals": {
        "thaumaturge:aqua": 1,
        "thaumaturge:ignis": 2
      }
    },
    "item": "kubejs:syntax_effect_evaporate_water",
    "recipe_id": "kubejs:inscribe_effect_evaporate_water",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "pickup",
    "display": "Pickup",
    "tier": 1,
    "method": "arcane",
    "description": "Collects loose matter into an ordered destination.",
    "recipe": {
      "ingredients": [
        "minecraft:hopper",
        "minecraft:string",
        "minecraft:iron_nugget"
      ],
      "vis": 12,
      "crystals": {
        "thaumaturge:aer": 1,
        "thaumaturge:ordo": 2
      }
    },
    "item": "kubejs:syntax_effect_pickup",
    "recipe_id": "kubejs:inscribe_effect_pickup",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "growth",
    "display": "Growth",
    "tier": 1,
    "method": "arcane",
    "description": "Accelerates the life-pattern already present in plants.",
    "recipe": {
      "ingredients": [
        "minecraft:bone_meal",
        "minecraft:wheat_seeds",
        "minecraft:oak_sapling"
      ],
      "vis": 12,
      "crystals": {
        "thaumaturge:terra": 2,
        "thaumaturge:aqua": 1
      }
    },
    "item": "kubejs:syntax_effect_growth",
    "recipe_id": "kubejs:inscribe_effect_growth",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "cleanse",
    "display": "Cleanse",
    "tier": 1,
    "method": "arcane",
    "description": "Strips foreign magical influences from a living pattern.",
    "recipe": {
      "ingredients": [
        "minecraft:milk_bucket",
        "minecraft:quartz",
        "minecraft:sugar"
      ],
      "vis": 15,
      "crystals": {
        "thaumaturge:aqua": 2,
        "thaumaturge:ordo": 2
      }
    },
    "item": "kubejs:syntax_effect_cleanse",
    "recipe_id": "kubejs:inscribe_effect_cleanse",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "night_vision",
    "display": "Night Vision",
    "tier": 1,
    "method": "arcane",
    "description": "Reorders perception to find light where little exists.",
    "recipe": {
      "ingredients": [
        "minecraft:golden_carrot",
        "minecraft:glow_ink_sac"
      ],
      "vis": 12,
      "crystals": {
        "thaumaturge:aer": 1,
        "thaumaturge:ordo": 2
      }
    },
    "item": "kubejs:syntax_effect_night_vision",
    "recipe_id": "kubejs:inscribe_effect_night_vision",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "water_breathing",
    "display": "Water Breathing",
    "tier": 1,
    "method": "arcane",
    "description": "Adapts breath to the dissolved air within water.",
    "recipe": {
      "ingredients": [
        "minecraft:pufferfish",
        "minecraft:kelp",
        "minecraft:glass_bottle"
      ],
      "vis": 12,
      "crystals": {
        "thaumaturge:aqua": 3
      }
    },
    "item": "kubejs:syntax_effect_water_breathing",
    "recipe_id": "kubejs:inscribe_effect_water_breathing",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "grapple",
    "display": "Grapple",
    "tier": 1,
    "method": "arcane",
    "description": "Creates a temporary line of force between caster and target.",
    "recipe": {
      "ingredients": [
        "minecraft:lead",
        "minecraft:tripwire_hook",
        "minecraft:string"
      ],
      "vis": 15,
      "crystals": {
        "thaumaturge:aer": 2,
        "thaumaturge:terra": 1
      }
    },
    "item": "kubejs:syntax_effect_grapple",
    "recipe_id": "kubejs:inscribe_effect_grapple",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "gust",
    "display": "Gust",
    "tier": 1,
    "method": "arcane",
    "description": "Releases a brief, coherent mass of moving air.",
    "recipe": {
      "ingredients": [
        "minecraft:feather",
        "minecraft:wind_charge"
      ],
      "vis": 12,
      "crystals": {
        "thaumaturge:aer": 3
      }
    },
    "item": "kubejs:syntax_effect_gust",
    "recipe_id": "kubejs:inscribe_effect_gust",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "speed",
    "display": "Speed",
    "tier": 1,
    "method": "arcane",
    "description": "Quickens controlled motion.",
    "recipe": {
      "ingredients": [
        "minecraft:sugar",
        "minecraft:rabbit_foot"
      ],
      "vis": 12,
      "crystals": {
        "thaumaturge:aer": 2,
        "thaumaturge:ordo": 1
      }
    },
    "item": "kubejs:syntax_effect_speed",
    "recipe_id": "kubejs:inscribe_effect_speed",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "haste",
    "display": "Haste",
    "tier": 2,
    "method": "arcane",
    "description": "Compresses the interval between deliberate actions.",
    "recipe": {
      "ingredients": [
        "minecraft:clock",
        "minecraft:sugar",
        "minecraft:redstone"
      ],
      "vis": 15,
      "crystals": {
        "thaumaturge:aer": 1,
        "thaumaturge:ordo": 2
      }
    },
    "item": "kubejs:syntax_effect_haste",
    "recipe_id": "kubejs:inscribe_effect_haste",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "slow",
    "display": "Slow",
    "tier": 1,
    "method": "arcane",
    "description": "Imposes resistance on movement.",
    "recipe": {
      "ingredients": [
        "minecraft:cobweb",
        "minecraft:soul_sand"
      ],
      "vis": 12,
      "crystals": {
        "thaumaturge:terra": 2,
        "thaumaturge:ordo": 1
      }
    },
    "item": "kubejs:syntax_effect_slow",
    "recipe_id": "kubejs:inscribe_effect_slow",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "weaken",
    "display": "Weaken",
    "tier": 1,
    "method": "arcane",
    "description": "Disrupts the target’s ability to exert force.",
    "recipe": {
      "ingredients": [
        "minecraft:fermented_spider_eye",
        "minecraft:rotten_flesh"
      ],
      "vis": 12,
      "crystals": {
        "thaumaturge:perditio": 2,
        "thaumaturge:aqua": 1
      }
    },
    "item": "kubejs:syntax_effect_weaken",
    "recipe_id": "kubejs:inscribe_effect_weaken",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "strengthen",
    "display": "Strengthen",
    "tier": 1,
    "method": "arcane",
    "description": "Reinforces the target’s capacity to exert force.",
    "recipe": {
      "ingredients": [
        "minecraft:blaze_powder",
        "minecraft:iron_ingot",
        "minecraft:redstone"
      ],
      "vis": 15,
      "crystals": {
        "thaumaturge:ignis": 1,
        "thaumaturge:ordo": 2
      }
    },
    "item": "kubejs:syntax_effect_strengthen",
    "recipe_id": "kubejs:inscribe_effect_strengthen",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "resist",
    "display": "Resist",
    "tier": 2,
    "method": "arcane",
    "description": "Hardens a living pattern against disruption.",
    "recipe": {
      "ingredients": [
        "minecraft:shield",
        "minecraft:iron_ingot",
        "minecraft:quartz"
      ],
      "vis": 18,
      "crystals": {
        "thaumaturge:terra": 2,
        "thaumaturge:ordo": 2
      }
    },
    "item": "kubejs:syntax_effect_resist",
    "recipe_id": "kubejs:inscribe_effect_resist",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "saturation",
    "display": "Saturation",
    "tier": 1,
    "method": "arcane",
    "description": "Supplies the body with the pattern of nourishment.",
    "recipe": {
      "ingredients": [
        "minecraft:bread",
        "minecraft:golden_carrot",
        "minecraft:honey_bottle"
      ],
      "vis": 15,
      "crystals": {
        "thaumaturge:terra": 1,
        "thaumaturge:aqua": 2
      }
    },
    "item": "kubejs:syntax_effect_saturation",
    "recipe_id": "kubejs:inscribe_effect_saturation",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "modifier",
    "id": "increased_area",
    "display": "Increased Area",
    "tier": 2,
    "method": "arcane",
    "description": "Extends a spell’s spatial grammar.",
    "recipe": {
      "ingredients": [
        "minecraft:compass",
        "minecraft:amethyst_shard",
        "minecraft:paper"
      ],
      "vis": 15,
      "crystals": {
        "thaumaturge:aer": 2,
        "thaumaturge:ordo": 1
      }
    },
    "item": "kubejs:syntax_modifier_increased_area",
    "recipe_id": "kubejs:inscribe_modifier_increased_area",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "modifier",
    "id": "increased_power",
    "display": "Increased Power",
    "tier": 2,
    "method": "arcane",
    "description": "Increases the intensity of an effect.",
    "recipe": {
      "ingredients": [
        "minecraft:redstone_block",
        "minecraft:blaze_powder",
        "minecraft:quartz"
      ],
      "vis": 18,
      "crystals": {
        "thaumaturge:ignis": 1,
        "thaumaturge:ordo": 2
      }
    },
    "item": "kubejs:syntax_modifier_increased_power",
    "recipe_id": "kubejs:inscribe_modifier_increased_power",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "modifier",
    "id": "gentleness",
    "display": "Gentleness",
    "tier": 1,
    "method": "arcane",
    "description": "Constrains an effect to avoid unnecessary destruction.",
    "recipe": {
      "ingredients": [
        "minecraft:feather",
        "minecraft:honey_bottle",
        "minecraft:white_wool"
      ],
      "vis": 12,
      "crystals": {
        "thaumaturge:aqua": 1,
        "thaumaturge:ordo": 2
      }
    },
    "item": "kubejs:syntax_modifier_gentleness",
    "recipe_id": "kubejs:inscribe_modifier_gentleness",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "modifier",
    "id": "pierce",
    "display": "Pierce",
    "tier": 2,
    "method": "arcane",
    "description": "Allows a projectile pattern to continue through resistance.",
    "recipe": {
      "ingredients": [
        "minecraft:arrow",
        "minecraft:prismarine_shard",
        "minecraft:flint"
      ],
      "vis": 15,
      "crystals": {
        "thaumaturge:terra": 1,
        "thaumaturge:perditio": 2
      }
    },
    "item": "kubejs:syntax_modifier_pierce",
    "recipe_id": "kubejs:inscribe_modifier_pierce",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "modifier",
    "id": "accelerate",
    "display": "Accelerate",
    "tier": 2,
    "method": "arcane",
    "description": "Shortens the time a spell takes to reach its target.",
    "recipe": {
      "ingredients": [
        "minecraft:sugar",
        "minecraft:wind_charge",
        "minecraft:redstone"
      ],
      "vis": 15,
      "crystals": {
        "thaumaturge:aer": 2,
        "thaumaturge:ignis": 1
      }
    },
    "item": "kubejs:syntax_modifier_accelerate",
    "recipe_id": "kubejs:inscribe_modifier_accelerate",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "delivery",
    "id": "rune",
    "display": "Rune",
    "tier": 2,
    "method": "ritual",
    "description": "Binds a spell to a written glyph until it is invoked.",
    "recipe": {
      "ingredients": [
        "minecraft:paper",
        "minecraft:lapis_lazuli",
        "minecraft:redstone",
        "occultism:purified_ink"
      ],
      "pentacle": "occultism:craft_foliot"
    },
    "item": "kubejs:syntax_delivery_rune",
    "recipe_id": "kubejs:inscribe_delivery_rune",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "delivery",
    "id": "tracking",
    "display": "Tracking",
    "tier": 2,
    "method": "ritual",
    "description": "Gives a projectile enough delegated intent to pursue a target.",
    "recipe": {
      "ingredients": [
        "minecraft:compass",
        "minecraft:ender_pearl",
        "minecraft:glow_ink_sac",
        "occultism:spirit_attuned_gem"
      ],
      "pentacle": "occultism:craft_djinni"
    },
    "item": "kubejs:syntax_delivery_tracking",
    "recipe_id": "kubejs:inscribe_delivery_tracking",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "delivery",
    "id": "trap",
    "display": "Trap",
    "tier": 2,
    "method": "ritual",
    "description": "Binds a spell to a place and a condition.",
    "recipe": {
      "ingredients": [
        "minecraft:tripwire_hook",
        "minecraft:string",
        "minecraft:redstone_torch",
        "occultism:spirit_attuned_gem"
      ],
      "pentacle": "occultism:craft_foliot"
    },
    "item": "kubejs:syntax_delivery_trap",
    "recipe_id": "kubejs:inscribe_delivery_trap",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "yeet",
    "display": "Yeet",
    "tier": 2,
    "method": "arcane",
    "description": "Applies force with little concern for control or dignity.",
    "recipe": {
      "ingredients": [
        "minecraft:slime_ball",
        "minecraft:piston",
        "minecraft:wind_charge"
      ],
      "vis": 22,
      "crystals": {
        "thaumaturge:aer": 3,
        "thaumaturge:perditio": 2
      }
    },
    "item": "kubejs:syntax_effect_yeet",
    "recipe_id": "kubejs:inscribe_effect_yeet",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "reap",
    "display": "Reap",
    "tier": 1,
    "method": "arcane",
    "description": "Harvests mature growth while preserving its cycle.",
    "recipe": {
      "ingredients": [
        "minecraft:golden_hoe",
        "minecraft:shears",
        "minecraft:bone_meal"
      ],
      "vis": 20,
      "crystals": {
        "thaumaturge:terra": 2,
        "thaumaturge:aqua": 2,
        "thaumaturge:ordo": 1
      }
    },
    "item": "kubejs:syntax_effect_reap",
    "recipe_id": "kubejs:inscribe_effect_reap",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "effect",
    "id": "poison",
    "display": "Poison",
    "tier": 2,
    "method": "arcane",
    "description": "Introduces a self-propagating harmful process.",
    "recipe": {
      "ingredients": [
        "minecraft:spider_eye",
        "minecraft:poisonous_potato",
        "occultism:otherworld_essence"
      ],
      "vis": 22,
      "crystals": {
        "thaumaturge:aqua": 2,
        "thaumaturge:perditio": 2
      }
    },
    "item": "kubejs:syntax_effect_poison",
    "recipe_id": "kubejs:inscribe_effect_poison",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "invisibility",
    "display": "Invisibility",
    "tier": 2,
    "method": "arcane",
    "description": "Diverts perception around the target’s visible form.",
    "recipe": {
      "ingredients": [
        "minecraft:glass",
        "minecraft:phantom_membrane",
        "occultism:purified_ink"
      ],
      "vis": 25,
      "crystals": {
        "thaumaturge:aer": 2,
        "thaumaturge:aqua": 2,
        "thaumaturge:ordo": 1
      }
    },
    "item": "kubejs:syntax_effect_invisibility",
    "recipe_id": "kubejs:inscribe_effect_invisibility",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "blink",
    "display": "Blink",
    "tier": 2,
    "method": "ritual",
    "description": "Momentarily loosens the caster’s position and fixes it nearby.",
    "recipe": {
      "ingredients": [
        "minecraft:ender_pearl",
        "minecraft:sugar",
        "minecraft:feather",
        "occultism:otherworld_essence"
      ],
      "pentacle": "occultism:craft_foliot"
    },
    "item": "kubejs:syntax_effect_blink",
    "recipe_id": "kubejs:inscribe_effect_blink",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "swap",
    "display": "Swap",
    "tier": 2,
    "method": "ritual",
    "description": "Exchanges two addressed positions without traversing the distance.",
    "recipe": {
      "ingredients": [
        "minecraft:ender_pearl",
        "minecraft:ender_pearl",
        "minecraft:compass",
        "minecraft:redstone_block"
      ],
      "pentacle": "occultism:craft_djinni"
    },
    "item": "kubejs:syntax_effect_swap",
    "recipe_id": "kubejs:inscribe_effect_swap",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "mark",
    "display": "Mark",
    "tier": 2,
    "method": "ritual",
    "description": "Assigns a persistent magical address.",
    "recipe": {
      "ingredients": [
        "minecraft:name_tag",
        "minecraft:paper",
        "minecraft:redstone",
        "occultism:purified_ink"
      ],
      "pentacle": "occultism:craft_foliot"
    },
    "item": "kubejs:syntax_effect_mark",
    "recipe_id": "kubejs:inscribe_effect_mark",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "recall",
    "display": "Recall",
    "tier": 2,
    "method": "ritual",
    "description": "Returns an addressed subject to a previously established mark.",
    "recipe": {
      "ingredients": [
        "minecraft:compass",
        "minecraft:clock",
        "minecraft:ender_pearl",
        "occultism:spirit_attuned_gem"
      ],
      "pentacle": "occultism:craft_djinni"
    },
    "item": "kubejs:syntax_effect_recall",
    "recipe_id": "kubejs:inscribe_effect_recall",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "shield",
    "display": "Shield",
    "tier": 2,
    "method": "arcane",
    "description": "Externalizes protection as a sustained magical boundary.",
    "recipe": {
      "ingredients": [
        "minecraft:shield",
        "minecraft:obsidian",
        "occultism:otherstone"
      ],
      "vis": 25,
      "crystals": {
        "thaumaturge:terra": 3,
        "thaumaturge:ordo": 2
      }
    },
    "item": "kubejs:syntax_effect_shield",
    "recipe_id": "kubejs:inscribe_effect_shield",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "charm",
    "display": "Charm",
    "tier": 2,
    "method": "ritual",
    "description": "Temporarily alters the relationship between will and obedience.",
    "recipe": {
      "ingredients": [
        "minecraft:rose_bush",
        "minecraft:honey_bottle",
        "minecraft:fermented_spider_eye",
        "occultism:spirit_attuned_gem"
      ],
      "pentacle": "occultism:craft_foliot"
    },
    "item": "kubejs:syntax_effect_charm",
    "recipe_id": "kubejs:inscribe_effect_charm",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "blind",
    "display": "Blind",
    "tier": 2,
    "method": "arcane",
    "description": "Severs useful vision without damaging the eye itself.",
    "recipe": {
      "ingredients": [
        "minecraft:ink_sac",
        "minecraft:coal",
        "minecraft:fermented_spider_eye"
      ],
      "vis": 20,
      "crystals": {
        "thaumaturge:perditio": 2,
        "thaumaturge:aqua": 1,
        "thaumaturge:ordo": 1
      }
    },
    "item": "kubejs:syntax_effect_blind",
    "recipe_id": "kubejs:inscribe_effect_blind",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "root",
    "display": "Root",
    "tier": 2,
    "method": "ritual",
    "description": "Binds a target’s location to the ground beneath it.",
    "recipe": {
      "ingredients": [
        "minecraft:vine",
        "minecraft:iron_chain",
        "minecraft:soul_sand",
        "occultism:otherworld_essence"
      ],
      "pentacle": "occultism:craft_foliot"
    },
    "item": "kubejs:syntax_effect_root",
    "recipe_id": "kubejs:inscribe_effect_root",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "regenerate",
    "display": "Regenerate",
    "tier": 2,
    "method": "arcane",
    "description": "Sustains repeated restoration over time.",
    "recipe": {
      "ingredients": [
        "minecraft:ghast_tear",
        "minecraft:golden_apple",
        "occultism:otherworld_essence"
      ],
      "vis": 30,
      "crystals": {
        "thaumaturge:aqua": 3,
        "thaumaturge:ordo": 3
      }
    },
    "item": "kubejs:syntax_effect_regenerate",
    "recipe_id": "kubejs:inscribe_effect_regenerate",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "conjure",
    "display": "Conjure",
    "tier": 1,
    "method": "arcane",
    "description": "Gives common building material lasting form.",
    "recipe": {
      "ingredients": [
        "minecraft:bricks",
        "minecraft:clay_ball",
        "minecraft:paper",
        "minecraft:amethyst_shard"
      ],
      "vis": 15,
      "crystals": {
        "thaumaturge:terra": 2,
        "thaumaturge:ordo": 1
      }
    },
    "item": "kubejs:syntax_effect_conjure",
    "recipe_id": "kubejs:inscribe_effect_conjure",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "modifier",
    "id": "nullify",
    "display": "Nullify",
    "tier": 2,
    "method": "arcane",
    "description": "Suppresses secondary consequences while retaining the primary effect.",
    "recipe": {
      "ingredients": [
        "minecraft:milk_bucket",
        "minecraft:quartz",
        "minecraft:redstone"
      ],
      "vis": 20,
      "crystals": {
        "thaumaturge:ordo": 3
      }
    },
    "item": "kubejs:syntax_modifier_nullify",
    "recipe_id": "kubejs:inscribe_modifier_nullify",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "modifier",
    "id": "prolonged",
    "display": "Prolonged",
    "tier": 2,
    "method": "ritual",
    "description": "Extends how long an attached effect remains bound.",
    "recipe": {
      "ingredients": [
        "minecraft:clock",
        "minecraft:redstone",
        "minecraft:string",
        "occultism:otherworld_essence"
      ],
      "pentacle": "occultism:craft_foliot"
    },
    "item": "kubejs:syntax_modifier_prolonged",
    "recipe_id": "kubejs:inscribe_modifier_prolonged",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "modifier",
    "id": "delay",
    "display": "Delay",
    "tier": 2,
    "method": "ritual",
    "description": "Separates the instruction from the moment of execution.",
    "recipe": {
      "ingredients": [
        "minecraft:repeater",
        "minecraft:clock",
        "minecraft:redstone",
        "occultism:purified_ink"
      ],
      "pentacle": "occultism:craft_foliot"
    },
    "item": "kubejs:syntax_modifier_delay",
    "recipe_id": "kubejs:inscribe_modifier_delay",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "modifier",
    "id": "bounce",
    "display": "Bounce",
    "tier": 2,
    "method": "arcane",
    "description": "Reflects a projectile’s path rather than ending it.",
    "recipe": {
      "ingredients": [
        "minecraft:slime_ball",
        "minecraft:rabbit_foot",
        "minecraft:shield"
      ],
      "vis": 22,
      "crystals": {
        "thaumaturge:aer": 2,
        "thaumaturge:ordo": 2
      }
    },
    "item": "kubejs:syntax_modifier_bounce",
    "recipe_id": "kubejs:inscribe_modifier_bounce",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "modifier",
    "id": "wall",
    "display": "Wall",
    "tier": 1,
    "method": "arcane",
    "description": "Shapes a block-affecting spell into its upright construction form.",
    "recipe": {
      "ingredients": [
        "minecraft:bricks",
        "minecraft:iron_bars",
        "minecraft:paper"
      ],
      "vis": 12,
      "crystals": {
        "thaumaturge:terra": 2,
        "thaumaturge:ordo": 1
      }
    },
    "item": "kubejs:syntax_modifier_wall",
    "recipe_id": "kubejs:inscribe_modifier_wall",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "modifier",
    "id": "floor",
    "display": "Floor",
    "tier": 1,
    "method": "arcane",
    "description": "Shapes a block-affecting spell into a horizontal layer.",
    "recipe": {
      "ingredients": [
        "minecraft:stone_bricks",
        "minecraft:smooth_stone_slab",
        "minecraft:paper"
      ],
      "vis": 12,
      "crystals": {
        "thaumaturge:terra": 2,
        "thaumaturge:ordo": 1
      }
    },
    "item": "kubejs:syntax_modifier_floor",
    "recipe_id": "kubejs:inscribe_modifier_floor",
    "research": "kubejs:lexical_foundations",
    "tier_name": "Foundation"
  },
  {
    "kind": "modifier",
    "id": "leech",
    "display": "Leech",
    "tier": 2,
    "method": "ritual",
    "description": "Redirects part of an effect’s harm back into the caster as vitality.",
    "recipe": {
      "ingredients": [
        "minecraft:spider_eye",
        "minecraft:ghast_tear",
        "minecraft:soul_sand",
        "occultism:spirit_attuned_gem"
      ],
      "pentacle": "occultism:craft_djinni"
    },
    "item": "kubejs:syntax_modifier_leech",
    "recipe_id": "kubejs:inscribe_modifier_leech",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "modifier",
    "id": "sunder",
    "display": "Sunder",
    "tier": 2,
    "method": "arcane",
    "description": "Makes an effect attack protection before the protected subject.",
    "recipe": {
      "ingredients": [
        "minecraft:iron_axe",
        "minecraft:flint",
        "minecraft:cracked_stone_bricks"
      ],
      "vis": 25,
      "crystals": {
        "thaumaturge:perditio": 3,
        "thaumaturge:terra": 2
      }
    },
    "item": "kubejs:syntax_modifier_sunder",
    "recipe_id": "kubejs:inscribe_modifier_sunder",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "modifier",
    "id": "return",
    "display": "Return",
    "tier": 2,
    "method": "ritual",
    "description": "Adds a return address to a traveling spell.",
    "recipe": {
      "ingredients": [
        "minecraft:ender_pearl",
        "minecraft:compass",
        "minecraft:arrow",
        "minecraft:chorus_fruit"
      ],
      "pentacle": "occultism:craft_djinni"
    },
    "item": "kubejs:syntax_modifier_return",
    "recipe_id": "kubejs:inscribe_modifier_return",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  },
  {
    "kind": "effect",
    "id": "explosion",
    "display": "Explosion",
    "tier": 3,
    "method": "infusion",
    "description": "Releases stored potential as sudden destructive expansion.",
    "recipe": {
      "components": [
        "minecraft:tnt",
        "minecraft:gunpowder",
        "minecraft:fire_charge",
        "minecraft:blaze_powder",
        "minecraft:redstone_block"
      ],
      "aspects": {
        "thaumaturge:ignis": 24,
        "thaumaturge:perditio": 24,
        "thaumaturge:potentia": 16,
        "thaumaturge:praecantatio": 12
      },
      "instability": 2
    },
    "item": "kubejs:syntax_effect_explosion",
    "recipe_id": "kubejs:inscribe_effect_explosion",
    "research": "kubejs:runic_mastery",
    "tier_name": "Infused"
  },
  {
    "kind": "effect",
    "id": "lightning",
    "display": "Lightning",
    "tier": 3,
    "method": "infusion",
    "description": "Establishes a violent electrical path between sky, spell, and target.",
    "recipe": {
      "components": [
        "minecraft:lightning_rod",
        "minecraft:copper_block",
        "minecraft:wind_charge",
        "minecraft:amethyst_shard",
        "minecraft:redstone_block"
      ],
      "aspects": {
        "thaumaturge:aer": 24,
        "thaumaturge:potentia": 24,
        "thaumaturge:praecantatio": 16
      },
      "instability": 2
    },
    "item": "kubejs:syntax_effect_lightning",
    "recipe_id": "kubejs:inscribe_effect_lightning",
    "research": "kubejs:runic_mastery",
    "tier_name": "Infused"
  },
  {
    "kind": "effect",
    "id": "wither",
    "display": "Wither",
    "tier": 3,
    "method": "infusion",
    "description": "Teaches living matter to continue dying.",
    "recipe": {
      "components": [
        "minecraft:wither_skeleton_skull",
        "minecraft:soul_sand",
        "minecraft:soul_sand",
        "minecraft:fermented_spider_eye",
        "occultism:otherworld_essence"
      ],
      "aspects": {
        "thaumaturge:mortuus": 32,
        "thaumaturge:perditio": 24,
        "thaumaturge:vitium": 16
      },
      "instability": 3
    },
    "item": "kubejs:syntax_effect_wither",
    "recipe_id": "kubejs:inscribe_effect_wither",
    "research": "kubejs:runic_mastery",
    "tier_name": "Infused"
  },
  {
    "kind": "effect",
    "id": "launch",
    "display": "Launch",
    "tier": 3,
    "method": "infusion",
    "description": "Imparts sustained upward motion.",
    "recipe": {
      "components": [
        "minecraft:piston",
        "minecraft:slime_block",
        "minecraft:wind_charge",
        "minecraft:wind_charge",
        "minecraft:feather"
      ],
      "aspects": {
        "thaumaturge:motus": 24,
        "thaumaturge:aer": 20,
        "thaumaturge:potentia": 16
      },
      "instability": 1
    },
    "item": "kubejs:syntax_effect_launch",
    "recipe_id": "kubejs:inscribe_effect_launch",
    "research": "kubejs:runic_mastery",
    "tier_name": "Infused"
  },
  {
    "kind": "effect",
    "id": "slam",
    "display": "Slam",
    "tier": 3,
    "method": "infusion",
    "description": "Converts height and motion into a focused impact.",
    "recipe": {
      "components": [
        "minecraft:anvil",
        "minecraft:iron_block",
        "minecraft:slime_block",
        "minecraft:wind_charge",
        "minecraft:obsidian"
      ],
      "aspects": {
        "thaumaturge:motus": 24,
        "thaumaturge:terra": 24,
        "thaumaturge:aversio": 16
      },
      "instability": 2
    },
    "item": "kubejs:syntax_effect_slam",
    "recipe_id": "kubejs:inscribe_effect_slam",
    "research": "kubejs:runic_mastery",
    "tier_name": "Infused"
  },
  {
    "kind": "effect",
    "id": "levitation",
    "display": "Levitation",
    "tier": 3,
    "method": "infusion",
    "description": "Suspends the target in a continuing upward relation.",
    "recipe": {
      "components": [
        "minecraft:shulker_shell",
        "minecraft:shulker_shell",
        "minecraft:phantom_membrane",
        "minecraft:feather",
        "minecraft:amethyst_shard"
      ],
      "aspects": {
        "thaumaturge:volatus": 24,
        "thaumaturge:aer": 20,
        "thaumaturge:motus": 16
      },
      "instability": 2
    },
    "item": "kubejs:syntax_effect_levitation",
    "recipe_id": "kubejs:inscribe_effect_levitation",
    "research": "kubejs:runic_mastery",
    "tier_name": "Infused"
  },
  {
    "kind": "modifier",
    "id": "chain",
    "display": "Chain",
    "tier": 3,
    "method": "infusion",
    "description": "Passes an instruction from one valid subject to the next.",
    "recipe": {
      "components": [
        "minecraft:iron_chain",
        "minecraft:iron_chain",
        "minecraft:redstone_block",
        "minecraft:amethyst_shard",
        "occultism:spirit_attuned_gem"
      ],
      "aspects": {
        "thaumaturge:vinculum": 32,
        "thaumaturge:ordo": 16,
        "thaumaturge:praecantatio": 20
      },
      "instability": 2
    },
    "item": "kubejs:syntax_modifier_chain",
    "recipe_id": "kubejs:inscribe_modifier_chain",
    "research": "kubejs:runic_mastery",
    "tier_name": "Infused"
  },
  {
    "kind": "modifier",
    "id": "duration",
    "display": "Duration",
    "tier": 3,
    "method": "infusion",
    "description": "Makes the spell itself persist and repeat its work.",
    "recipe": {
      "components": [
        "minecraft:clock",
        "minecraft:clock",
        "minecraft:redstone_block",
        "minecraft:phantom_membrane",
        "occultism:purified_ink"
      ],
      "aspects": {
        "thaumaturge:ordo": 24,
        "thaumaturge:cognitio": 16,
        "thaumaturge:praecantatio": 24
      },
      "instability": 2
    },
    "item": "kubejs:syntax_modifier_duration",
    "recipe_id": "kubejs:inscribe_modifier_duration",
    "research": "kubejs:runic_mastery",
    "tier_name": "Infused"
  },
  {
    "kind": "modifier",
    "id": "linger",
    "display": "Linger",
    "tier": 3,
    "method": "infusion",
    "description": "Leaves an active magical residue at the point of impact.",
    "recipe": {
      "components": [
        "minecraft:dragon_breath",
        "minecraft:cobweb",
        "minecraft:slime_ball",
        "minecraft:redstone_block",
        "occultism:otherworld_essence"
      ],
      "aspects": {
        "thaumaturge:vinculum": 24,
        "thaumaturge:aer": 16,
        "thaumaturge:praecantatio": 24
      },
      "instability": 3
    },
    "item": "kubejs:syntax_modifier_linger",
    "recipe_id": "kubejs:inscribe_modifier_linger",
    "research": "kubejs:runic_mastery",
    "tier_name": "Infused"
  },
  {
    "kind": "modifier",
    "id": "fortunate_son",
    "display": "Fortunate Son",
    "tier": 3,
    "method": "infusion",
    "description": "Biases uncertain outcomes toward material gain.",
    "recipe": {
      "components": [
        "minecraft:diamond",
        "minecraft:emerald",
        "minecraft:rabbit_foot",
        "minecraft:lapis_block",
        "occultism:spirit_attuned_gem"
      ],
      "aspects": {
        "thaumaturge:desiderium": 32,
        "thaumaturge:permutatio": 20,
        "thaumaturge:praecantatio": 16
      },
      "instability": 3
    },
    "item": "kubejs:syntax_modifier_fortunate_son",
    "recipe_id": "kubejs:inscribe_modifier_fortunate_son",
    "research": "kubejs:runic_mastery",
    "tier_name": "Infused"
  },
  {
    "kind": "effect",
    "id": "teleport",
    "display": "Teleport",
    "tier": 3,
    "method": "infusion",
    "description": "Declares two separated positions to be momentarily equivalent.",
    "recipe": {
      "components": [
        "occultism:stable_wormhole",
        "minecraft:ender_eye",
        "minecraft:ender_eye",
        "minecraft:chorus_fruit",
        "minecraft:echo_shard",
        "occultism:spirit_attuned_gem"
      ],
      "aspects": {
        "thaumaturge:alienis": 40,
        "thaumaturge:motus": 32,
        "thaumaturge:vacuos": 32,
        "thaumaturge:praecantatio": 24
      },
      "instability": 5
    },
    "item": "kubejs:syntax_effect_teleport",
    "recipe_id": "kubejs:inscribe_effect_teleport",
    "research": "kubejs:runic_mastery",
    "tier_name": "Infused"
  },
  {
    "kind": "effect",
    "id": "summon",
    "display": "Summon",
    "tier": 3,
    "method": "ritual",
    "description": "Delegates enough agency to a spell that it may call and direct another being.",
    "recipe": {
      "ingredients": [
        "occultism:soul_gem",
        "occultism:iesnium_ingot",
        "occultism:spirit_attuned_gem",
        "minecraft:bone",
        "minecraft:ender_eye",
        "occultism:otherworld_essence"
      ],
      "pentacle": "occultism:craft_afrit"
    },
    "item": "kubejs:syntax_effect_summon",
    "recipe_id": "kubejs:inscribe_effect_summon",
    "research": "kubejs:runic_mastery",
    "tier_name": "Infused"
  },
  {
    "kind": "modifier",
    "id": "double",
    "display": "Double",
    "tier": 3,
    "method": "infusion",
    "description": "Executes a complete instruction twice rather than strengthening it once.",
    "recipe": {
      "components": [
        "minecraft:echo_shard",
        "minecraft:echo_shard",
        "minecraft:amethyst_shard",
        "minecraft:amethyst_shard",
        "minecraft:diamond",
        "minecraft:redstone_block"
      ],
      "aspects": {
        "thaumaturge:permutatio": 32,
        "thaumaturge:ordo": 32,
        "thaumaturge:potentia": 24,
        "thaumaturge:praecantatio": 24
      },
      "instability": 4
    },
    "item": "kubejs:syntax_modifier_double",
    "recipe_id": "kubejs:inscribe_modifier_double",
    "research": "kubejs:runic_mastery",
    "tier_name": "Infused"
  },
  {
    "kind": "modifier",
    "id": "echo",
    "display": "Echo",
    "tier": 3,
    "method": "infusion",
    "description": "Causes a completed spell to remember and repeat itself.",
    "recipe": {
      "components": [
        "minecraft:echo_shard",
        "minecraft:echo_shard",
        "minecraft:sculk_sensor",
        "minecraft:amethyst_shard",
        "occultism:otherworld_essence"
      ],
      "aspects": {
        "thaumaturge:sensus": 32,
        "thaumaturge:cognitio": 24,
        "thaumaturge:alienis": 16,
        "thaumaturge:praecantatio": 24
      },
      "instability": 4
    },
    "item": "kubejs:syntax_modifier_echo",
    "recipe_id": "kubejs:inscribe_modifier_echo",
    "research": "kubejs:runic_mastery",
    "tier_name": "Infused"
  },
  {
    "kind": "modifier",
    "id": "split",
    "display": "Split",
    "tier": 3,
    "method": "infusion",
    "description": "Divides one delivery pattern into several independent trajectories.",
    "recipe": {
      "components": [
        "minecraft:prismarine_crystals",
        "minecraft:prismarine_crystals",
        "minecraft:arrow",
        "minecraft:arrow",
        "minecraft:slime_ball",
        "minecraft:amethyst_shard"
      ],
      "aspects": {
        "thaumaturge:permutatio": 32,
        "thaumaturge:ordo": 24,
        "thaumaturge:praecantatio": 24
      },
      "instability": 4
    },
    "item": "kubejs:syntax_modifier_split",
    "recipe_id": "kubejs:inscribe_modifier_split",
    "research": "kubejs:runic_mastery",
    "tier_name": "Infused"
  },
  {
    "kind": "modifier",
    "id": "fill",
    "display": "Fill",
    "tier": 2,
    "method": "arcane",
    "description": "Fills compatible constructions; cannot be combined with Break.",
    "recipe": {
      "ingredients": [
        "minecraft:bucket",
        "minecraft:clay_ball",
        "minecraft:sand",
        "minecraft:gravel"
      ],
      "vis": 18,
      "crystals": {
        "thaumaturge:terra": 2,
        "thaumaturge:aqua": 1,
        "thaumaturge:ordo": 1
      }
    },
    "item": "kubejs:syntax_modifier_fill",
    "recipe_id": "kubejs:inscribe_modifier_fill",
    "research": "kubejs:carved_syntax",
    "tier_name": "Structured"
  }
]

  global.EA_ARCANE_SYNTAX_VERSION = '2.0.1-focus-progression'

  var tierRarity = { 1: 'uncommon', 2: 'rare', 3: 'epic' }

  StartupEvents.registry('item', function(event) {
    global.EA_ARCANE_SYNTAX_COMPONENTS.forEach(function(component) {
      var itemPath = component.item.substring(component.item.indexOf(':') + 1)
      var builder = event.create(itemPath)
        .displayName('Inscribed Rune: ' + component.display)
        .maxStackSize(16)
        .rarity(tierRarity[component.tier])
        .texture('kubejs:item/arcane_syntax/' + itemPath)
        .tooltip('§7' + component.tier_name + ' ' + component.kind.charAt(0).toUpperCase() + component.kind.slice(1) + ' component')
        .tooltip('§8' + component.description)
        .tooltip('§dRight-click to learn permanently. §8Consumed when understood.')
        .tag('kubejs:arcane_syntax_runes')

      if (component.tier >= 3) builder.glow(true)
    })

    // Keep this legacy registry ID so existing inventories remain loadable.
    // It is no longer crafted and is not a required progression milestone.
    event.create('eldritch_syntax_key')
      .displayName('The Unsealed Grammar (Legacy)')
      .unstackable()
      .rarity('epic')
      .glow(true)
      .texture('kubejs:item/arcane_syntax/eldritch_syntax_key')
      .tooltip('§7A keepsake from an older classification of magical syntax.')
      .tooltip('§8No longer crafted or required. Infused is the highest tier.')
      .tooltip('§8No focus milestone is granted by this item.')
  })
})()
