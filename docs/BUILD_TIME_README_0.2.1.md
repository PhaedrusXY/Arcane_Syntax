# Arcane Syntax 0.2.1 — Thaumaturge 1.1.0 test

This is a compatibility TEST CANDIDATE for Eldritch Aeons, not a full modpack and
not a game-tested release. It updates the existing 0.2.0 focus migration.

## What changed

- Requires Thaumaturge 1.1.0 rather than 1.0.2; Build a Spell remains 1.0.3.
- Updates five renamed WandVisHelper method references, not just the dependency
  check. Wand charge, payment, discount and refund paths use the new names.
- Conjure is Foundation for rune learning, recipe research, book placement and
  actual focus validation. Its ingredients and costs are unchanged. Wall and
  Floor stay Foundation; Fill and Increased Area stay Structured.
- Preserves the polished narrative and optional Two Grammars entry. Foundation
  and Structured text now agree with Conjure's new tier.
- Moves 76 existing item textures, six existing datapack JSON overrides and 42
  translated strings into the addon JAR. Runtime rune learning, item registration,
  recipes and research registration remain in KubeJS. Item/research identifiers
  remain unchanged. No frame-rate or tick-time improvement has been measured.
- Contains no Outer Lands structure templates. The old 1.0.2 fixes should be
  removed so Thaumaturge 1.1.0 can supply its own corrected templates.

The 0.1 Vis/mana conversion, native discounts, Break+Fill protection, focus power
bonuses, mana HUD suppression and focus-only progression are retained. Native and
Syntax components still cannot be mixed; Syntax remains Instant and linear.
This package does not overwrite any config files or unrelated pack scripts.

## Before installing

Close Minecraft COMPLETELY, not just the world, and stop a dedicated server if
used. There is a new JAR AND a changed startup script. Back up the whole test
instance/world. No new world or research reset is required by these changes, but
this is an experimental build: use the copied test instance.

Keep Thaumaturge 1.1.0, Build a Spell 1.0.3, Build A Spell Fix 1.1.2, KubeJS and a
Thaumaturge-1.1-compatible KubeThaum (1.3.x; 1.3.1 is the reference release). The
addon declares KubeThaum optional for standalone use, but these pack scripts DO
need it. Keep the updated Thaumic Tracker/other addons that already let you load.
Do not restore their old 1.0.2-only versions.

## Manual installation

1. Remove older arcane_syntax_unified JARs from mods. Install only this new one.
2. Remove the obsolete 1.0.2 template patches under:
   kubejs/data/thaumaturge/structure/outer_lands/
   REMOVE_OLD_PORTAL_PATCHES.txt lists the exact 41 old patch paths; the first
   three-hall patch is a subset. Remove only those patches, not the whole
   thaumaturge namespace or the entire kubejs/data folder. No need to install
   the earlier v2 template-fix ZIP.
3. Merge this package's mods/ and kubejs/ folders into the instance root,
   overwriting matching files. Do not replace/delete whole existing folders.
4. Optional housekeeping: remove identical old copies of the 82 static files
   listed in MIGRATED_STATIC_FILES.txt. Their replacements are now in the JAR.
   Keeping identical copies is harmless but retains a second source of truth.
   Preserve and review any intentionally customized versions instead.
5. Fully restart Minecraft, then open the backed-up test world. Do not /reload.

For multiplayer, install the new JAR on client AND server and synchronize the
pack overlay. Keep the same dependency versions on both sides. For an existing
CurseForge export, update its overrides with these KubeJS changes and remove old
portal patch files there too. This ZIP is not a ready-to-publish CurseForge export.

## Optional Windows installer

Extract this ZIP OUTSIDE the Minecraft instance. With Minecraft closed, open
PowerShell in the extracted folder. Preview first:

    .\Install-Update.ps1 -InstancePath 'D:\Minecraft\instances\Instances\Eldritch Aeons' -WhatIf

Install by running the same command without -WhatIf. The installer verifies all
payload hashes, asks you to confirm the game is closed, backs up touched files,
replaces the addon/scripts, and removes only recognized old patch/static files.
Modified or unrecognized cleanup files are left in place with a warning. Review
those warnings, especially any remaining portal overrides. The installer never
changes saves or unrelated mods/configuration. It has not been executed on Windows
in this environment; manual installation above is equally valid.

Backups go to arcane_syntax_backups/0.2.1-<timestamp>/ inside the instance. File
changes are automatically rolled back if an installation step throws an error.
The separate world backup remains necessary; the installer does not back up saves.

## First test

1. Reach the title screen and load the test world without a dependency/mixin error.
2. Confirm the book still has Two Grammars and the polished prose; Conjure's recipe
   is in Lexical Foundations, not Structured Syntax.
3. On a character with only the Lesser/ Foundation milestone, learn Conjure and
   inscribe Cast -> Conjure -> Wall (or Floor) into a Lesser Focus. A character
   with all research/milestones unlocked cannot prove the early-game gates.
4. Use a charged native wand to cast it. Check that Vis decreases and personal
   BaS mana is not the casting resource. Use the normal Conjure material setup.
5. Confirm a truly Structured component is rejected by the Lesser Focus, even
   when known. Test an ordinary native Thaumaturge focus separately.
6. Portal retesting is optional. Removing template overrides does not rewrite
   labyrinth chunks already generated in the save; use a newly generated
   labyrinth to test the native templates independently.

The status command remains /ea_arcane_syntax_status. Existing learned Conjure
knowledge is retained. A full UI/casting test is still needed even if launch works.
On a failure, retain latest.log and any generated crash report from that session.

## Validation boundary — important

The included JAR reuses the 0.2.0 addon classes, recompiles the dependency-free
core, changes five exact method-symbol names to match the inspected 1.1.0 source,
and replaces metadata/resources. This is NOT a full dependency-resolved NeoForge
build. No third-party JARs or compile-time substitutes are bundled.

The core tests passed 4,656 assertions; the pack-script tests passed 971 assertions
against API-shaped mocks. These are not live-game tests. The public source was
inspected, but the exact released Thaumaturge 1.1.0 binary was not available here
for full linkage verification. Minecraft startup, Mixin transformation and actual
spell execution remain untested. See VALIDATION.md and BUILD_VALIDATION.json.

## Rollback

Close the game/server. Restore the backed-up addon and scripts/resources together.
If returning to Thaumaturge 1.0.2, restore its matching dependent mods as well;
0.2.1 intentionally requires 1.1.0. Use the world backup when reverting gameplay
changes. Do not assume a downgrade is safe merely because the files can be copied.

## Build from source

This source archive is separate from the deployment ZIP. Install JDK 25, copy the
ORIGINAL Build a Spell 1.0.3 and Thaumaturge 1.1.0 JARs named in libs/README.txt into
libs/, and run build.cmd, or use Gradle 9.2.1 clean build. The normal source build
has not been run here. Test the resulting artifact in the copied instance.

Pure tests require JDK 21+: bash tools/test_core.sh. Script mocks require Node:
node tools/test_pack.cjs. pack/ is a complete REFERENCE snapshot of the preceding
0.2.0 pack overlay plus this update; it contains old configuration values for
reference. Use the separate deployment ZIP for the incremental install without
resetting your current settings. Do not blindly copy the source pack/config.

The historical 0.2.0 reports are in docs/previous_0.2.0 and are not proof of 1.1.0
compatibility. tools/build_offline_candidate.py documents the exact fallback
packaging procedure used for this test candidate, requiring the old addon JAR.
