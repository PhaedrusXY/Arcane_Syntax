# Changelog

## Unreleased — Auromancy research layout correction

- Restore Thaumaturge 1.1.0's original Advanced Foci and Greater Foci research-tree positions while preserving Arcane Syntax's additional research prerequisites.
- The published 0.2.1 test JAR still contains the older positions; until a rebuilt JAR is released, use the separate `kubejs/data` layout hotfix when testing.

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
