// Eldritch Aeons — Draconic Artifice
// Additive late-game progression overlay for:
//   Minecraft 26.1.2 / NeoForge
//   Thaumaturge 1.0.2 + KubeThaum 1.1
//   Ice and Fire CE 2.2-beta.4
//   Build A Spell 1.0.3
//
// Design:
// - Dragonforge bricks use Dreadstone instead of ordinary stone bricks.
// - The Dragonforge Aperture (the *_input block) and Core are made by infusion.
// - The research requires the Thaumaturge Greater Focus, linking this branch to
//   the established Tier 3 Arcane Syntax progression without altering it.
// - Dragonsteel is forged from Thaumium rather than mundane iron.

const EA_DRACONIC_RESEARCH = 'kubejs:draconic_metallurgy'

const EA_DRAGONFORGES = [
  {
    type: 'fire',
    brick: 'iceandfire:dragonforge_fire_brick',
    core: 'iceandfire:dragonforge_fire_core_disabled',
    input: 'iceandfire:dragonforge_fire_input',
    heart: 'iceandfire:fire_dragon_heart',
    blood: 'iceandfire:fire_dragon_blood',
    ingot: 'iceandfire:dragonsteel_fire_ingot',
    scaleTag: '#iceandfire:storage_blocks/scales/dragon/fire',
    elementAspects: {
      'thaumaturge:ignis': 64,
      'thaumaturge:potentia': 32
    }
  },
  {
    type: 'ice',
    brick: 'iceandfire:dragonforge_ice_brick',
    core: 'iceandfire:dragonforge_ice_core_disabled',
    input: 'iceandfire:dragonforge_ice_input',
    heart: 'iceandfire:ice_dragon_heart',
    blood: 'iceandfire:ice_dragon_blood',
    ingot: 'iceandfire:dragonsteel_ice_ingot',
    scaleTag: '#iceandfire:storage_blocks/scales/dragon/ice',
    elementAspects: {
      'thaumaturge:gelum': 64,
      'thaumaturge:ordo': 32
    }
  },
  {
    type: 'lightning',
    brick: 'iceandfire:dragonforge_lightning_brick',
    core: 'iceandfire:dragonforge_lightning_core_disabled',
    input: 'iceandfire:dragonforge_lightning_input',
    heart: 'iceandfire:lightning_dragon_heart',
    blood: 'iceandfire:lightning_dragon_blood',
    ingot: 'iceandfire:dragonsteel_lightning_ingot',
    scaleTag: '#iceandfire:storage_blocks/scales/dragon/lightning',
    elementAspects: {
      'thaumaturge:aer': 40,
      'thaumaturge:potentia': 72
    }
  }
]

ThaumaturgeEvents.research(event => {
  // This category is deliberately small now, but leaves room for later
  // dragon-egg, dragon-blood, and dragonsteel equipment research.
  event.category('kubejs:draconic_artifice')
    .style('thaumaturge:infusion')
    .index(45)
    .formula('thaumaturge:praecantatio', 2)
    .formula('thaumaturge:potentia', 2)
    .formula('thaumaturge:bestia', 1)

  event.create(EA_DRACONIC_RESEARCH)
    .category('kubejs:draconic_artifice')
    .title('research.kubejs.draconic_metallurgy')
    .icon('iceandfire:dragonforge_fire_core_disabled')
    .position(0, 0)
    .parent('thaumaturge:infusion')
    .complexity(3)
    .noteAspect('thaumaturge:praecantatio', 3)
    .noteAspect('thaumaturge:machina', 2)
    .noteAspect('thaumaturge:metallum', 2)
    .noteAspect('thaumaturge:vinculum', 2)
    .stage(stage => {
      stage.text('research.kubejs.draconic_metallurgy.stage.0')
      stage.obtain('thaumaturge:focus_3', 1)
      stage.obtain('iceandfire:dread_stone', 8)
      stage.obtain('iceandfire:dragonbone', 4)
      stage.obtain('thaumaturge:ingot_thaumium', 4)
      stage.requireKnowledge('theory', 'thaumaturge:infusion', 32)
    })
    .stage(stage => {
      stage.text('research.kubejs.draconic_metallurgy.stage.1')
      EA_DRAGONFORGES.forEach(forge => {
        stage.recipe(forge.brick)
        stage.recipe(forge.input)
        stage.recipe(forge.core)
      })
    })
})

ServerEvents.recipes(event => {
  EA_DRAGONFORGES.forEach(forge => {
    // Preserve Ice and Fire's original recipe IDs so Bestiary/JEI links and
    // any other integrations continue to point at the replacement recipes.
    event.remove({ id: forge.brick })
    event.remove({ id: forge.input })
    event.remove({ id: forge.core })
    event.remove({ id: `iceandfire:dragonforge/dragonsteel_${forge.type}_ingot` })

    // Dragonforge bricks are no longer ordinary masonry. Dreadstone supplies
    // the heat- and pressure-resistant body; dragon scales tune it to one
    // particular form of breath.
    event.shaped(
      `4x ${forge.brick}`,
      [
        'SDS',
        'DSD',
        'SDS'
      ],
      {
        S: forge.scaleTag,
        D: 'iceandfire:dread_stone'
      }
    ).id(forge.brick)

    const apertureAspects = {
      'thaumaturge:praecantatio': 32,
      'thaumaturge:machina': 32,
      'thaumaturge:vinculum': 24,
      'thaumaturge:metallum': 24
    }
    Object.keys(forge.elementAspects).forEach(aspect => {
      apertureAspects[aspect] = Math.ceil(forge.elementAspects[aspect] / 2)
    })

    // The block called *_input internally is the Dragonforge Aperture: the
    // throat that accepts and concentrates a dragon's breath.
    event.recipes.thaumaturge.infusion(
      forge.input,
      forge.brick,
      [
        'iceandfire:dread_stone',
        'thaumaturge:ingot_thaumium',
        'iceandfire:dread_stone',
        'thaumaturge:ingot_thaumium',
        'thaumaturge:vis_resonator',
        forge.blood,
        'minecraft:redstone_block',
        'thaumaturge:ingot_thaumium',
        'iceandfire:dread_stone',
        'thaumaturge:ingot_thaumium',
        'iceandfire:dread_stone'
      ],
      apertureAspects
    )
      .instability(4)
      .research(EA_DRACONIC_RESEARCH)
      .id(forge.input)

    const coreAspects = {
      'thaumaturge:praecantatio': 64,
      'thaumaturge:machina': 48,
      'thaumaturge:vinculum': 40,
      'thaumaturge:praemunio': 40,
      'thaumaturge:metallum': 32
    }
    Object.keys(forge.elementAspects).forEach(aspect => {
      coreAspects[aspect] = forge.elementAspects[aspect]
    })

    // The heart remains the literal center of the forge. The surrounding
    // infused bricks and Thaumium cage it, focus it, and keep the structure
    // from failing under sustained dragon breath.
    event.recipes.thaumaturge.infusion(
      forge.core,
      forge.heart,
      [
        forge.brick,
        'thaumaturge:ingot_thaumium',
        forge.brick,
        'thaumaturge:vis_resonator',
        forge.brick,
        'thaumaturge:ingot_thaumium',
        forge.brick,
        forge.blood,
        forge.brick,
        'thaumaturge:ingot_thaumium',
        forge.brick,
        'thaumaturge:salis_mundus',
        forge.brick,
        'thaumaturge:ingot_thaumium',
        forge.brick,
        'thaumaturge:vis_resonator'
      ],
      coreAspects
    )
      .instability(8)
      .research(EA_DRACONIC_RESEARCH)
      .id(forge.core)

    // Dragonsteel is no longer mundane iron with dragon blood baked into it.
    // Thaumium is already a magically receptive metal; the forge fixes the
    // dragon's elemental nature permanently into that matrix.
    event.custom({
      type: 'iceandfire:dragonforge',
      dragonType: forge.type,
      cookTime: 1000,
      input: 'thaumaturge:ingot_thaumium',
      blood: forge.blood,
      result: {
        id: forge.ingot
      }
    }).id(`iceandfire:dragonforge/dragonsteel_${forge.type}_ingot`)
  })
})
