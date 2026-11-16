# Eldritch Aeons — Arcane Syntax focus migration 0.2.0

This is the next experimental test build, not a game-tested release. The addon is
0.2.0; the accompanying pack scripts are Arcane Syntax 2.0.0. This does not assign
a new version number to the entire Eldritch Aeons modpack.

## Install in the copied test instance

1. Close Minecraft. Stop the dedicated test server too, when using one. Keep a
   backup of the existing instance, scripts and configuration.
2. Remove `mods/arcane_syntax_unified-0.1.0-prototype.jar` (and any other old JAR
   with mod ID `arcane_syntax_unified`). Do not leave both addon versions installed.
3. Merge this ZIP's `mods`, `kubejs`, and `config` folders into the Minecraft
   instance root, allowing matching files to be overwritten. Do not replace or
   delete the entire existing KubeJS/config folders.
4. For multiplayer, install the same addon and pack overlay on both client and
   server. Singleplayer also needs `kubejs/server_scripts` in its instance.
5. Start Minecraft normally and create a NEW test world. Do not use `/reload` for
   this migration. Existing worlds are not a clean progression test.

Keep Build a Spell 1.0.3, Thaumaturge 1.0.2, Build A Spell Fix 1.1.2, KubeThaum 1.1,
KubeJS 26.1.2-8.0.6, and the pack's other mods installed. Build a Spell is still the
spell engine; only its separate player casting/progression routes are retired.
This candidate targets Minecraft 26.1.2 / NeoForge 26.1.2.122 and those exact
Build a Spell/Thaumaturge versions. It is NOT for 1.20.1 or Thaumaturge 1.1.x.

The two old Runic Mastery 1.2.1 overlay filenames are included as comment-only
files. Overwrite them too: otherwise they may restore old text or recipe links.
Unrelated server scripts (trainer persistence, Dread Incursions, restart scripts,
etc.) are not changed by this ZIP. It is not a complete standalone modpack.

For a CurseForge export, put the KubeJS/config overlay under `overrides/`. Use a
proper hosted CurseForge file reference for the addon in a public export; this
manual test ZIP is not a validated CurseForge distribution export.

## New progression

- Native Discovering Auromancy -> craft the native Lesser Focus in the Crucible.
- Resonant Casting now asks for that Lesser Focus, not a Worn Wand. Click Complete
  on the research stages; recipe unlocks still depend on research completion.
- A Lesser Focus unlocks the Foundation learning milestone, teaches Cast, and gives
  two initial Blank Runes once. Craft more Blank Runes after Resonant Casting.
- Complete Lexical Foundations, make specific Inscribed Runes, and right-click
  each to learn its component permanently. These are not consumed on each cast.
- Complete Basic Auromancy far enough to unlock the Focal Manipulator. Compose a
  linear, Instant Syntax spell and inscribe it onto a native focus.
- Names and Natures -> Advanced Focus at the Arcane Workbench -> Structured Syntax.
- Structured Syntax + native Infusion -> Infused Syntax -> Greater Focus through
  infusion -> Runic Mastery. No primordial pearl was added to this milestone.
- Draconic Artifice now requires a Greater Focus instead of the Runic Wand.

The original upgrade materials and relative early/mid/infusion pacing are retained
by transferring the old carved/runic upgrade recipes onto Advanced/Greater foci.
The Lesser Focus uses its native recipe. The native Advanced/Greater research
pages were reconciled with these recipes. Their original IDs are retained so book
and JEI references resolve. `thaumaturge:infusion/focus_2` is deliberately retained
as a recipe ID even though its replacement recipe is arcane-workbench shapeless.

## Casting and equipment

Research unlocks rune recipes; earned focus milestones gate rune learning; the
ACTUAL focus tier gates inscription and casting. Lower foci cannot cast higher
components just because the player knows them. Native complexity limits remain.

All Syntax spells use a native Thaumaturge wand with a socketed focus. Use the
native Change Focus key (default F; check conflicts), then right-click away from
nodes to cast. Vis comes from the wand, with native aspect pools and discounts.
No extra aura fallback or personal-mana payment is introduced.

The configured 0.1 Vis/mana conversion is unchanged. The five supplied
`config/buildaspell/*.toml` files are copied unchanged from the provided server
archive, preserving component costs, wand potency values and zero random essence
progression. Existing world-specific serverconfig overrides can supersede the
new main config; the requested fresh world avoids most such leftovers.

Lesser/Advanced/Greater foci inherit the configured Worn/Carved/Runic power bonus
(+6/+15/+30 in the supplied config) while held in a native wand. The old mana cost
reductions are NOT stacked on native cap/gear discounts. Like BaS's prior held
item logic, the highest qualifying focus in either hand supplies this bonus.

The Arcane Altar remains for Spell Power. It accepts Thaumaturge wands, hides the
two mana choices and rejects their server-side use. The mana enchantment registries
and old equipment data remain for save compatibility, but the new supported-item
tag is empty. Old enchanted items/books are not deleted from inventories or loot.

## Retired player routes

- Worn, Carved and Runic wand recipes and JEI entries.
- Their right-click casts and paid personal-mana casting entry point.
- The old spell editor, quick-slot and spell-ring keyboard actions.
- The old mana HUD while this migration mode is enabled.
- Stock starter component/guidebook grants and random-rune learning.

Physical legacy item registrations and saved learned components/research IDs are
retained; this update does not erase characters. Old saved milestone flags remain
valid. Merely obtaining an old wand or grammar key does not advance a new player.
Existing BaS saved-slot data is retained but is not automatically converted into
foci. Old key mappings may remain listed in Controls, but their actions are
inactive. Disabling addon flags alone does not restore the removed pack recipes.

## Rejected combinations and diagnostics

Break + Fill anywhere in a composition is rejected before inscription/payment.
Break + Increased Area remains allowed. Invalid tiers and unknown/unlearned
components also produce clear errors. "Not enough Vis (have/need)" identifies the
short primal pools rather than just showing a generic error.

`/ea_arcane_syntax_status` shows the learning milestone and known-component counts.
`/ea_arcane_syntax_rescan` rescans carried/socketed foci without resetting data.
The shipped `logCasts = true` records complete casts, actual Vis debits in centivis,
and BaS mana before/after dispatch. Search `latest.log` for `Syntax cast:`.

## What remains limited

Syntax spells still require Instant style and a linear Syntax-only composition
apart from the native Origin. Mixing native and Syntax spell parts, branching,
and native Charged/Channeled Syntax casts are not supported. Native Thaumaturge
spells are retained rather than globally disabled; distinct native effects and
NPC/boss spell infrastructure have not been removed.

This is the complete migration of the pack's player-facing BaS progression and
casting routes, not completion of every planned unified-spell-engine feature.
The separate potential BaS Chain-after-Break ordering issue is not fixed here.
All 19 shipped combo definitions were checked for composition preservation by the
pure compiler tests, but their in-game effects were not played/tested here.

## Validation boundary

The candidate JAR was compiled offline using declarations from the exact supplied
mod binaries plus minimal compile-time Minecraft/NeoForge/Mixin substitutes. It
was NOT built against a complete dependency-resolved Minecraft/NeoForge runtime,
and Minecraft was NOT launched here. No substitutes or modified dependency JARs
are distributed. Source and a conventional JDK 25/NeoForge build project are
provided separately. See VALIDATION.md and TEST_PLAN.md before testing.

## Rollback

Close the game/server, remove the 0.2.0 addon, and restore the backed-up scripts,
configuration and old addon. Use the prior world backup or a separate fresh world;
do not assume a new world's altered research/inscriptions will be reversible just
by replacing one JAR. Do not remove the underlying Build a Spell/Thaumaturge mods.

## Build the source

Copy the ORIGINAL two required mod JARs into `libs/`, install JDK 25, and run
`build.cmd` on Windows (or Gradle 9.2.1 `clean build`). The build helper verifies
the official Gradle distribution checksum. Mod binaries are not included.
The normal build has not been run here.

Pure tests: `bash tools/test_core.sh` with JDK 21+; pack mocks: `node tools/test_pack.cjs`.
Deploy the resulting JAR together with `pack/`, not the JAR alone.
