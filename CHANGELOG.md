# Changelog

## Unreleased — complete modifier compatibility validation

- Use Build a Spell 1.0.3's loaded `ModifierApplicability` rules for every modifier, rather than maintaining a Shield-specific exclusion or a copied compatibility table. Effect modifiers follow their owning effect; delivery modifiers use delivery rules.
- Reject incompatible compositions in the shared analysis/inscription/casting path before charging resources. Previously inscribed invalid foci retain their data and report why they need editing.
- Filter Arcane Syntax palette choices for the actual selected insertion point, including downstream modifier rebinding when inserting an effect. Refresh the palette after selection and draft changes and recheck stale placement attempts.
- Preserve Build A Spell Fix 1.1.2's live Fill exclusions, existing pack restrictions, focus power, Shield absorption, spell costs, and component IDs.
- Add a version-pinned semantic test suite covering all 7,238 delivery/effect/modifier triples and a complete component compatibility reference. Live client/server Mixin and gameplay checks remain a separate release gate.
- This is a source change for the next release. The 1.2 release artifact and its packaging workflow have not been updated.

## 1.2 — CurseForge-aligned release numbering and corrected research layout

- Release as **`arcane_syntax_unified-1.2.jar`** to match the user's simplified two-part naming convention and follow the previously uploaded CurseForge version **1.1.0**. The embedded NeoForge mod version, Gradle source, and JAR manifest also identify this build as **1.2**.
- Carry forward the corrected Thaumonomicon research coordinates: **Advanced Foci (2, -4)** and **Greater Foci (4, -3)**. Crafting recipes, research prerequisites, component knowledge, progression, and spell logic remain unchanged.
- The artifact is a repackaging of the prior **0.2.2 GitHub development candidate**, itself derived from the preserved **0.2.1** compatibility test JAR. It is not a new dependency-resolved NeoForge build, and requires the pack's KubeJS scripts for its intended progression.
- Going forward, use `arcane_syntax_unified-X.Y.jar` for downloaded artifacts and `vX.Y` for GitHub tags, with each update explained here rather than in the filename. The old 0.2.x files and tags are archival history, not the current version.
- Live gameplay and dedicated-server validation remain open; this release should not be interpreted as adding new features beyond the previously documented integration.

## 0.2.2 — Archived GitHub development candidate (Auromancy layout correction)

- Correct Advanced Foci to column **2**, row **-4**, and Greater Foci to column **4**, row **-3** in the Thaumonomicon. No changes to crafting recipes, research prerequisites, progression gates, or spell behavior.
- Standardize the distributable as **`arcane_syntax_unified-0.2.2.jar`**, and synchronize the version in the mod metadata, Gradle source, and package manifest. The mod ID remains `arcane_syntax_unified`.
- Repackage the original 0.2.1 offline compatibility test JAR; no dependency-resolved rebuild or gameplay-code change. All other JAR payload contents remain unchanged except version identifiers and the two research JSON entries. The old 0.2.1 layout-fix prerelease is superseded.
- Preserve the Arcane Altar's Spell Power enchanting for Thaumaturge wands; Mana Pool and Mana Regeneration enchantments remain disabled. This behavior predates 0.2.2 and is documented here for clarity, not introduced by this correction.
- The 0.2.2 candidate remains experimental and needs an in-game layout/enchanting check before any separate CurseForge release.

## Repository initialization — 2026-11-15 testing update

- Established this repository as the source home for the integration addon; retained the existing `arcane_syntax_unified` mod ID and namespaces.
- Preserved the 0.2.1 source, MIT license, build/test tools, reference pack layer and original deployment artifact.
- Added compatibility, installation, testing-status and contribution documentation.
- Recorded later maintainer-reported loading/research success separately from the original build-time limitations.
- Documented the Focal Manipulator's timed inscription: removing a focus before completion explained the reported missing spell.
- Kept focus switching and intermittent right-click behavior open for retesting; no input fix is claimed.

## 0.2.1 — Thaumaturge 1.1.0 compatibility test

- Retargeted dependency metadata and five Vis-helper calls for Thaumaturge 1.1.0; Build a Spell remains 1.0.3.
- Moved Conjure to Foundation across rune learning, recipe research, book placement and focus validation. Materials and costs remain unchanged; Wall/Floor stay Foundation and Fill/Increased Area stay Structured.
- Preserved polished research prose and the optional Two Grammars entry.
- Bundled 76 textures, six datapack overrides and 42 translations in the addon. Runtime pack progression and recipes remain in KubeJS; no performance gain was measured.
- Supplied a narrow incremental deployment without resetting user configuration; listed obsolete 1.0.2 Outer Lands template fixes for cleanup.
- Preserved the 0.1 Vis/mana conversion, native discounts, focus bonuses, legacy-casting retirement and Break + Fill restriction.
- Distributed an experimental offline compatibility port, not a fully dependency-resolved NeoForge build. Initial maintainer testing is encouraging; the gameplay matrix remains incomplete.

## 0.2.0 — focus-progression migration candidate

- Replaced Worn/Carved/Runic wand milestones with Lesser/Advanced/Greater foci for Foundation/Structured/Infused progression.
- Removed legacy wand dependencies from Arcane Syntax research and the downstream Draconic Artifice gate.
- Retained Blank Runes, the 75 Inscribed Rune identities and saved knowledge; granted Cast at the initial focus milestone.
- Reused the former upgrade materials for Advanced/Greater Focus recipes and reconciled their research entries.
- Retired the old wand recipes, JEI entries, separate player-casting shortcuts, editor actions, random-rune learning and personal-mana HUD while preserving registrations/data.
- Enforced focus tiers during analysis/inscription and casting; retained native Thaumaturge spells separately.
- Added native-wand support to the Arcane Altar's Spell Power role and retired mana-enchantment choices.
- Blocked Break + Fill before payment; retained Break + Increased Area.
- Added aspect-specific insufficient-Vis feedback, native discounts and focus-power handling.

## Narrative-polish overlay for 0.2.0

- Revised Arcane Syntax and Draconic Artifice research from cautious experimentation toward increasingly overconfident conclusions.
- Added the optional Two Grammars entry explaining why native Thaumaturge and Syntax components cannot currently be combined in one spell.

## 0.1.0 — initial prototype

- First experimental native wand/focus casting integration. Historical details are retained in the preceding artifacts; this repository does not present the prototype as a current installation target.
