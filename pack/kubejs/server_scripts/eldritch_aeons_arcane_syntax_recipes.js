// Eldritch Aeons — Arcane Syntax crafted-rune recipes v2.0.0

(function() {
  function addArcaneRune(event, component) {
    var ingredients = ['buildaspell:blank_rune'].concat(component.recipe.ingredients)
    event.recipes.thaumaturge.arcane_workbench_shapeless(
      component.item,
      ingredients,
      component.recipe.vis,
      component.recipe.crystals
    )
      .id(component.recipe_id)
      .research(component.research)
  }

  function addInfusionRune(event, component) {
    event.recipes.thaumaturge.infusion(
      component.item,
      'buildaspell:blank_rune',
      component.recipe.components,
      component.recipe.aspects
    )
      .instability(component.recipe.instability)
      .id(component.recipe_id)
      .research(component.research)
  }

  function addRitualRune(event, component) {
    event.recipes.occultism.ritual(
      component.item,
      component.recipe.ingredients,
      'buildaspell:blank_rune',
      component.recipe.pentacle
    ).id(component.recipe_id)
  }

  ServerEvents.recipes(function(event) {
    // Replace Build A Spell's stock progression infrastructure.
    event.remove({ id: 'buildaspell:worn_wand' })
    event.remove({ id: 'buildaspell:carved_wand' })
    event.remove({ id: 'buildaspell:runic_wand' })
    event.remove({ id: 'buildaspell:arcane_altar' })
    event.remove({ id: 'buildaspell:blank_rune' })

    // The native Lesser Focus crucible recipe remains the entry point. No BaS wand recipes.
    ;['buildaspell:worn_wand', 'buildaspell:carved_wand', 'buildaspell:runic_wand'].forEach(function(id) {
      event.remove({ output: id })
    })
    event.remove({ output: 'thaumaturge:focus_2' })
    event.remove({ output: 'thaumaturge:focus_3' })

    // Blank Runes are inexpensive substrates and come four at a time.
    event.recipes.thaumaturge.arcane_workbench_shapeless(
      '4x buildaspell:blank_rune',
      ['minecraft:polished_deepslate', 'minecraft:paper', 'minecraft:paper', 'minecraft:redstone', 'minecraft:amethyst_shard'],
      10,
      { 'thaumaturge:ordo': 1, 'thaumaturge:perditio': 1 }
    )
      .id('kubejs:arcane_blank_runes')
      .research('kubejs:resonant_casting')

    // Old random Spell Runes can be reclaimed rather than discarded.
    event.shapeless('buildaspell:blank_rune', ['buildaspell:spell_rune'])
      .id('kubejs:reclaim_unstructured_spell_rune')

    // Advanced Focus: preserve the pack's early Structured / occult-correspondence milestone.
    event.recipes.thaumaturge.arcane_workbench_shapeless(
      'thaumaturge:focus_2',
      ['thaumaturge:focus_1', 'occultism:spirit_attuned_gem', 'minecraft:amethyst_shard', 'minecraft:gold_ingot', 'minecraft:feather', 'minecraft:ink_sac'],
      30,
      { 'thaumaturge:ordo': 2, 'thaumaturge:aer': 1, 'thaumaturge:aqua': 1 }
    )
      .id('thaumaturge:infusion/focus_2')
      .research('kubejs:names_and_natures')

    // Greater Focus: preserve the pack's Infusion milestone, without a new primordial-pearl gate.
    event.recipes.thaumaturge.infusion(
      'thaumaturge:focus_3',
      'thaumaturge:focus_2',
      [
        'buildaspell:blank_rune', 'buildaspell:blank_rune',
        'occultism:spirit_attuned_gem', 'occultism:spirit_attuned_gem',
        'minecraft:amethyst_shard', 'minecraft:amethyst_shard',
        'minecraft:ender_eye', 'minecraft:gold_ingot'
      ],
      {
        'thaumaturge:praecantatio': 32,
        'thaumaturge:potentia': 24,
        'thaumaturge:vinculum': 16,
        'thaumaturge:cognitio': 16
      }
    )
      .instability(2)
      .id('thaumaturge:infusion/focus_3')
      .research('kubejs:infused_syntax')

    // Arcane Altar: Spell Power enhancement only; Unified Casting hides/rejects mana enchants.
    event.recipes.thaumaturge.infusion(
      'buildaspell:arcane_altar',
      'minecraft:enchanting_table',
      [
        'minecraft:obsidian', 'minecraft:obsidian',
        'minecraft:amethyst_shard', 'minecraft:amethyst_shard',
        'buildaspell:blank_rune', 'buildaspell:blank_rune',
        'occultism:spirit_attuned_gem', 'minecraft:ender_eye'
      ],
      {
        'thaumaturge:praecantatio': 28,
        'thaumaturge:fabrico': 20,
        'thaumaturge:ordo': 20,
        'thaumaturge:potentia': 16
      }
    )
      .instability(1)
      .id('kubejs:arcane_altar_infusion')
      .research('kubejs:infused_syntax')

    // The former fourth-tier key has no recipe or learning gate in the three-tier system.
    // Its item registry entry is retained solely for old inventories and milestones.
    event.remove({ id: 'kubejs:unseal_eldritch_grammar' })

    global.EA_ARCANE_SYNTAX_COMPONENTS.forEach(function(component) {
      if (component.method === 'arcane') addArcaneRune(event, component)
      else if (component.method === 'infusion') addInfusionRune(event, component)
      else if (component.method === 'ritual') addRitualRune(event, component)
    })
  })
})()
