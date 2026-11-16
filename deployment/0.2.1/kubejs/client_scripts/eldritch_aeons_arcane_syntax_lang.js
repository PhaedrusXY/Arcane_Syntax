// Arcane Syntax Unified 0.2.1: language lives in the addon JAR.
// These client-only tooltip and recipe-viewer hooks remain in KubeJS.
// Replace Build A Spell's original essence-charging tooltip. In this pack,
// Blank Runes are neutral substrates for deliberate inscriptions and never
// transform randomly.
ItemEvents.modifyTooltips(function(event) {
  event.modify('buildaspell:blank_rune', function(tooltip) {
    // Build A Spell adds three progression lines after the item name.
    tooltip.removeLine(1)
    tooltip.removeLine(1)
    tooltip.removeLine(1)
    tooltip.add([
      Text.gray('Neutral substrate for an Arcane Syntax inscription.'),
      Text.darkPurple('Use it at the Arcane Workbench, in Infusion, or as an Occultism ritual focus.')
    ])
  })

  event.modify('buildaspell:spell_rune', function(tooltip) {
    tooltip.add([
      Text.gray('An obsolete, unstructured inscription.'),
      Text.darkPurple('Craft it alone to recover a Blank Rune; right-clicking it reveals nothing.')
    ])
  })
})

ItemEvents.modifyTooltips(function(event) {
  var names = {'thaumaturge:focus_1':'Foundation', 'thaumaturge:focus_2':'Foundation + Structured', 'thaumaturge:focus_3':'All three Arcane Syntax tiers'}
  Object.keys(names).forEach(function(id) {
    event.modify(id, function(tooltip) { tooltip.add(Text.darkPurple(names[id] + ' vocabulary.')) })
  })
  ;['buildaspell:worn_wand','buildaspell:carved_wand','buildaspell:runic_wand'].forEach(function(id) {
    event.modify(id, function(tooltip) { tooltip.add(Text.gray('Retired: use a Thaumaturge wand with an inscribed focus.')) })
  })
})
RecipeViewerEvents.removeEntries('item', function(event) {
  ;['buildaspell:worn_wand','buildaspell:carved_wand','buildaspell:runic_wand','buildaspell:spell_rune','kubejs:eldritch_syntax_key'].forEach(function(id) { event.remove(id) })
})
