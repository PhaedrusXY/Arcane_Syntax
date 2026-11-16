// Eldritch Aeons — Arcane Syntax KubeThaum research v2.0.1

ThaumaturgeEvents.research(function(event) {
  event.category('kubejs:arcane_syntax')
    .style('thaumaturge:auromancy')
    .index(35)
    .formula('thaumaturge:praecantatio', 2)
    .formula('thaumaturge:cognitio', 1)
    .formula('thaumaturge:ordo', 1)

  event.create('kubejs:resonant_casting')
    .category('kubejs:arcane_syntax')
    .title('research.kubejs.resonant_casting')
    .icon('thaumaturge:focus_1')
    .position(0, 0)
    .parent('thaumaturge:unlock_auromancy')
    .stage(function(stage) {
      stage.text('research.kubejs.resonant_casting.stage.0')
      stage.recipe('thaumaturge:crucible/focus_1')
      stage.craft('thaumaturge:focus_1')
    })
    .stage(function(stage) {
      stage.text('research.kubejs.resonant_casting.stage.1')
      stage.recipe('thaumaturge:arcane_workbench/focal_manipulator')
      stage.recipe('kubejs:arcane_blank_runes')
    })

  event.create('kubejs:lexical_foundations')
    .category('kubejs:arcane_syntax')
    .title('research.kubejs.lexical_foundations')
    .icon('kubejs:syntax_effect_damage')
    .position(3, 0)
    .parent('kubejs:resonant_casting')
    .stage(function(stage) {
      stage.text('research.kubejs.lexical_foundations.stage.0')
      stage.craft('thaumaturge:arcane_workbench')
      stage.craft('buildaspell:blank_rune')
    })
    .stage(function(stage) {
      stage.text('research.kubejs.lexical_foundations.stage.1')
      stage.recipe('kubejs:inscribe_effect_damage')
      stage.recipe('kubejs:inscribe_effect_break')
      stage.recipe('kubejs:inscribe_effect_reap')
      stage.recipe('kubejs:inscribe_effect_create_water')
      // Keep the same two stages so existing completion indices remain valid.
      stage.text('research.kubejs.lexical_foundations.stage.2')
      stage.recipe('kubejs:inscribe_effect_conjure')
      stage.recipe('kubejs:inscribe_modifier_wall')
      stage.recipe('kubejs:inscribe_modifier_floor')
      stage.recipe('kubejs:inscribe_modifier_gentleness')
      stage.text('research.kubejs.lexical_foundations.stage.3')
    })

  event.create('kubejs:names_and_natures')
    .category('kubejs:arcane_syntax')
    .title('research.kubejs.names_and_natures')
    .icon('occultism:spirit_attuned_gem')
    .position(6, -1)
    .parent('kubejs:lexical_foundations')
    .stage(function(stage) {
      stage.text('research.kubejs.names_and_natures.stage.0')
      stage.craft('occultism:spirit_attuned_gem')
    })
    .stage(function(stage) {
      stage.text('research.kubejs.names_and_natures.stage.1')
      stage.recipe('thaumaturge:infusion/focus_2')
    })

  event.create('kubejs:carved_syntax')
    .category('kubejs:arcane_syntax')
    .title('research.kubejs.carved_syntax')
    .icon('thaumaturge:focus_2')
    .position(9, -1)
    .parent('kubejs:names_and_natures')
    .stage(function(stage) {
      stage.text('research.kubejs.carved_syntax.stage.0')
      stage.craft('thaumaturge:focus_2')
    })
    .stage(function(stage) {
      stage.text('research.kubejs.carved_syntax.stage.1')
      // Occultism ritual recipes do not render correctly inside Thaumaturge's generic
      // recipe research page. Keep ritual examples in JEI/Occultism and only embed native
      // Thaumaturge-compatible recipes here.
      stage.recipe('kubejs:inscribe_delivery_sight')
      stage.recipe('kubejs:inscribe_modifier_increased_power')
      stage.recipe('kubejs:inscribe_modifier_increased_area')
      stage.recipe('kubejs:inscribe_modifier_accelerate')
      stage.recipe('kubejs:inscribe_modifier_pierce')
      stage.text('research.kubejs.carved_syntax.stage.2')
      stage.recipe('kubejs:inscribe_modifier_fill')
      stage.text('research.kubejs.carved_syntax.stage.3')
      stage.recipe('kubejs:inscribe_effect_heal')
      stage.recipe('kubejs:inscribe_effect_haste')
      stage.recipe('kubejs:inscribe_effect_resist')
      stage.recipe('kubejs:inscribe_effect_shield')
    })

  event.create('kubejs:infused_syntax')
    .category('kubejs:arcane_syntax')
    .title('research.kubejs.infused_syntax')
    .icon('thaumaturge:focus_3')
    .position(12, 0)
    .parent('kubejs:carved_syntax')
    .parent('thaumaturge:infusion')
    .stage(function(stage) {
      stage.text('research.kubejs.infused_syntax.stage.0')
      stage.recipe('thaumaturge:infusion/focus_3')
      stage.recipe('kubejs:arcane_altar_infusion')
    })
    .stage(function(stage) {
      stage.text('research.kubejs.infused_syntax.stage.1')
    })

  event.create('kubejs:runic_mastery')
    .category('kubejs:arcane_syntax')
    .title('research.kubejs.runic_mastery')
    .icon('thaumaturge:focus_3')
    .position(15, 0)
    .parent('kubejs:infused_syntax')
    .stage(function(stage) {
      stage.text('research.kubejs.runic_mastery.stage.0')
      stage.recipe('thaumaturge:infusion/focus_3')
      stage.craft('thaumaturge:focus_3')
    })
    .stage(function(stage) {
      stage.text('research.kubejs.runic_mastery.stage.1')
      stage.text('research.kubejs.runic_mastery.stage.2')
      stage.text('research.kubejs.runic_mastery.stage.3')
      stage.recipe('kubejs:inscribe_effect_explosion')
      stage.recipe('kubejs:inscribe_modifier_chain')
      stage.recipe('kubejs:inscribe_modifier_duration')
    })

  // Legacy IDs and two-stage layouts are retained for existing research saves.
  // These are optional Tier 3 reference branches, not another tier or recipe gate.
  event.create('kubejs:forbidden_syntax')
    .category('kubejs:arcane_syntax')
    .title('research.kubejs.forbidden_syntax')
    .icon('kubejs:syntax_effect_teleport')
    .position(18, -1)
    .parent('kubejs:runic_mastery')
    .stage(function(stage) {
      stage.text('research.kubejs.forbidden_syntax.stage.0')
    })
    .stage(function(stage) {
      stage.text('research.kubejs.forbidden_syntax.stage.1')
      stage.recipe('kubejs:inscribe_effect_teleport')
      // Summon is an Occultism ritual; its pentacle remains documented in JEI.
    })

  event.create('kubejs:unsealed_grammar')
    .category('kubejs:arcane_syntax')
    .title('research.kubejs.unsealed_grammar')
    .icon('kubejs:syntax_modifier_echo')
    .position(18, 1)
    .parent('kubejs:runic_mastery')
    .stage(function(stage) {
      stage.text('research.kubejs.unsealed_grammar.stage.0')
    })
    .stage(function(stage) {
      stage.text('research.kubejs.unsealed_grammar.stage.1')
      stage.recipe('kubejs:inscribe_modifier_double')
      stage.recipe('kubejs:inscribe_modifier_echo')
      stage.recipe('kubejs:inscribe_modifier_split')
    })

  // Optional narrative note: two notations, one wand, no mixed component graphs.
  // This entry is not required for progression and does not change the spell engine.
  event.create('kubejs:two_grammars')
    .category('kubejs:arcane_syntax')
    .title('research.kubejs.two_grammars')
    .icon('thaumaturge:focus_1')
    .position(4, 3)
    .parent('kubejs:lexical_foundations')
    .stage(function(stage) {
      stage.text('research.kubejs.two_grammars.stage.0')
    })
    .stage(function(stage) {
      stage.text('research.kubejs.two_grammars.stage.1')
    })

})
