// Eldritch Aeons - Arcane Syntax 2.0.1 / integration addon 0.2.1
// Permanent component knowledge is retained; focus milestones replace BaS wand ownership.
(function() {
  if (typeof Java === 'undefined') return // KubeThaum's isolated syntax checker has no Java bridge.
  var Attachments = Java.loadClass('buildaspell.registry.ModAttachments')
  var Delivery = Java.loadClass('buildaspell.spell.DeliveryMethod')
  var Effect = Java.loadClass('buildaspell.spell.SpellEffect')
  var Modifier = Java.loadClass('buildaspell.spell.SpellModifier')
  var NativeWand = Java.loadClass('com.leclowndu93150.thaumaturge.content.wands.ItemWand')
  var TIER_KEY = 'ea_arcane_syntax_tier'
  var PRIMER = 'ea_arcane_syntax_primer_runes_given'
  var FOCUS = { 'thaumaturge:focus_1': 1, 'thaumaturge:focus_2': 2, 'thaumaturge:focus_3': 3 }
  var TIER_NAMES = ['Uninitiated', 'Foundation', 'Structured', 'Infused']
  var FOCUS_NAMES = ['', 'Lesser Focus', 'Advanced Focus', 'Greater Focus']
  function data(player) { return player.getData(Attachments.PLAYER_SPELL_DATA.get()) }
  function object(c) {
    if (c.kind === 'delivery') return Delivery.fromId(c.id)
    if (c.kind === 'effect') return Effect.fromId(c.id)
    return Modifier.fromId(c.id)
  }
  function known(player, c) {
    var v = object(c); if (v == null) return false
    if (c.kind === 'delivery') return data(player).isDeliveryUnlocked(v)
    if (c.kind === 'effect') return data(player).isEffectUnlocked(v)
    return data(player).isModifierUnlocked(v)
  }
  function unlock(player, c) {
    var v = object(c); if (v == null) return false
    if (c.kind === 'delivery') data(player).unlockDelivery(v)
    else if (c.kind === 'effect') data(player).unlockEffect(v)
    else data(player).unlockModifier(v)
    player.syncData(Attachments.PLAYER_SPELL_DATA.get())
    return true
  }
  function storedTier(player) {
    var p = player.persistentData
    var rank = Math.max(0, Math.min(3, p.getIntOr(TIER_KEY, 0)))
    // Saved achievements remain valid. Merely holding a retired wand/key does NOT grant a tier.
    if (p.getBooleanOr('ea_arcane_syntax_worn', false)) rank = Math.max(rank, 1)
    if (p.getBooleanOr('ea_arcane_syntax_carved', false)) rank = Math.max(rank, 2)
    if (p.getBooleanOr('ea_arcane_syntax_runic', false) || p.getBooleanOr('ea_arcane_syntax_forbidden', false)) rank = 3
    return rank
  }
  function markHandled(player) {
    var d = data(player), changed = false
    if (!d.isStarterKitGranted()) { d.markStarterKitGranted(); changed = true }
    if (!d.isGuidebookGranted()) { d.markGuidebookGranted(); changed = true }
    return changed
  }
  function raiseTier(player, rank) {
    var flagsChanged = markHandled(player)
    var previous = storedTier(player)
    var next = Math.max(previous, Math.min(3, rank))
    if (player.persistentData.getIntOr(TIER_KEY, -1) !== next) player.persistentData.putInt(TIER_KEY, next)
    if (next < 1) {
      if (flagsChanged) player.syncData(Attachments.PLAYER_SPELL_DATA.get())
      return
    }
    if (!known(player, {kind:'delivery', id:'cast'})) unlock(player, {kind:'delivery', id:'cast'})
    if (next > previous) {
      player.tell('§5Your ' + FOCUS_NAMES[next] + ' supports §f' + TIER_NAMES[next] + '§5 syntax.')
      player.tell('§7Learn individual concepts from Inscribed Runes, then compose a focus in the Focal Manipulator.')
    }
    if (!player.persistentData.getBooleanOr(PRIMER, false)) {
      player.persistentData.putBoolean(PRIMER, true)
      player.server.runCommandSilent('give ' + player.getName().getString() + ' buildaspell:blank_rune 2')
      player.tell('§7Two Blank Runes are provided for your first inscriptions. Cast is now understood.')
    }
    if (flagsChanged) player.syncData(Attachments.PLAYER_SPELL_DATA.get())
  }
  function rankInStack(stack) {
    if (stack.isEmpty()) return 0
    var rank = FOCUS[String(stack.id)] || 0
    if (rank === 0 && stack.getItem() instanceof NativeWand) {
      var socketed = stack.getItem().getFocusStack(stack)
      if (!socketed.isEmpty()) rank = FOCUS[String(socketed.id)] || 0
    }
    return rank
  }
  function scan(player) {
    var rank = storedTier(player)
    var inventory = player.getInventory()
    for (var i=0; i<inventory.getContainerSize(); i++) rank = Math.max(rank, rankInStack(inventory.getItem(i)))
    rank = Math.max(rank, rankInStack(player.getOffhandItem()))
    raiseTier(player, rank)
  }
  Object.keys(FOCUS).forEach(function(id) {
    PlayerEvents.inventoryChanged(id, function(event) {
      if (event.player.server != null) raiseTier(event.player, FOCUS[id])
    })
  })
  PlayerEvents.inventoryChanged('thaumaturge:wand', function(event) {
    if (event.player.server != null) scan(event.player)
  })
  PlayerEvents.loggedIn(function(event) { if (event.player.server != null) scan(event.player) })
  global.EA_ARCANE_SYNTAX_COMPONENTS.forEach(function(c) {
    ItemEvents.rightClicked(c.item, function(event) {
      var player = event.player
      if (player == null || player.server == null) return
      scan(player)
      if (known(player, c)) {
        player.tell('§7You already understand §f' + c.display + '§7. The rune remains intact.')
        event.cancel(); return
      }
      if (storedTier(player) < c.tier) {
        player.tell('§7First obtain a §f' + FOCUS_NAMES[c.tier] + '§7 to understand ' + c.tier_name + ' inscriptions.')
        event.cancel(); return
      }
      if (!unlock(player, c)) {
        player.tell('§cUnrecognized component: ' + c.kind + '/' + c.id)
        event.cancel(); return
      }
      event.item.shrink(1)
      player.tell('§aLearned §6' + c.kind + ': §b' + c.display)
      player.server.runCommandSilent('playsound minecraft:block.enchantment_table.use player ' + player.getName().getString() + ' ~ ~ ~ 0.9 1.15')
      event.cancel()
    })
  })
  ItemEvents.rightClicked('buildaspell:spell_rune', function(event) {
    if (event.player != null) event.player.tell('§7Craft this unstructured rune into a Blank Rune, then inscribe a specific concept.')
    event.cancel()
  })
  ServerEvents.basicCommand('ea_arcane_syntax_status', function(event) {
    var player = event.getPlayer()
    if (player == null) return 'Run this command in-game.'
    scan(player)
    var d=data(player), tier=storedTier(player)
    player.tell('§dArcane Syntax 2.0.1 / integration addon 0.2.1')
    player.tell('§7Learning milestone: §f' + TIER_NAMES[tier] + '§7; casting uses the actual socketed focus tier.')
    player.tell('§7Knowledge: §f' + d.getUnlockedDeliveryMethods().size() + ' deliveries, ' + d.getUnlockedEffects().size() + ' effects, ' + d.getUnlockedModifiers().size() + ' modifiers.')
    return 1
  })
  ServerEvents.basicCommand('ea_arcane_syntax_rescan', function(event) {
    var player=event.getPlayer()
    if (player == null) return 'Run this command in-game.'
    scan(player)
    return 'Focus milestones refreshed; no spell knowledge or saved data was erased.'
  })
  console.info('[Arcane Syntax 2.0.1] Focus milestones active: Lesser / Advanced / Greater. No BaS wand dependency.')
})()
