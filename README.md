# Arcane Syntax

> One wand. Two grammars of magic.

**Arcane Syntax** integrates learned Build a Spell components with Thaumaturge's native focus, wand, research, and Vis systems. It is developed alongside [Eldritch Aeons](https://github.com/PhaedrusXY/Eldritch_Aeons), while retaining its own source and release identity.

**Current development version: 1.3 — component compatibility candidate for Thaumaturge 1.1.0.** Live gameplay verification of the new validation and editor filtering remains pending. This is source and development documentation, not an announcement of a new public Eldritch Aeons release.

The public project name is **Arcane Syntax**. Its existing internal mod ID remains `arcane_syntax_unified` to preserve saved data, resource locations, configuration compatibility, and mod dependencies.

**1.3 candidate:** component compatibility now uses the installed Build a Spell
rules for all effects, modifiers, and deliveries, including the separate Fix mod's changes.
The Focal Manipulator filters choices for the selected insertion point, and server validation
rejects incompatible inscriptions/casts before payment. See the complete
[component compatibility audit](docs/COMPONENT_COMPATIBILITY.md) and
[validation status](docs/TESTING_STATUS.md). The published 1.2 JAR predates this change.

## Casting and progression

- Learn individual concepts permanently from crafted Inscribed Runes; Blank Runes remain part of progression.
- Compose a Syntax spell in Thaumaturge's Focal Manipulator, finish inscribing it onto a native focus, then cast it through a native wand or staff.
- Pay with wand Vis rather than Build a Spell's personal mana pool. The configured default conversion remains **0.1 Vis per mana**, before native discounts.
- Gate Foundation, Structured, and Infused components with **Lesser, Advanced, and Greater foci**. The actual focus tier is checked during spell validation and casting.
- Retire Worn, Carved, and Runic Build a Spell wand progression, recipes, and separate player-casting controls without deleting old registrations or saved knowledge.
- Keep Thaumaturge's native spells available. **Native and Syntax components cannot currently be combined in one spell.** Syntax compositions are Instant and linear; native branch, charged, and channeled behavior is not supported for Syntax.
- Reject **Break + Fill** before inscription/payment. Break with Increased Area remains available within normal costs and tier limits.

**1.2 Auromancy research layout fix:** Advanced Foci is at column 2, row -4; Greater Foci is at column 4, row -3. This corrects their Thaumonomicon positions only. Recipes, prerequisites, tier gates and spell execution are unchanged. The fix is inside the addon, without a KubeJS override, and still requires an in-game visual check.

**Conjure remains Foundation**, alongside Wall and Floor. Fill and Increased Area remain Structured. The optional *Two Grammars* entry explains the separate spell grammars; the journal's voice grows from cautious experimentation toward dangerous confidence.

## Versioning and downloads

**Current release:** [Arcane Syntax v1.2](https://github.com/PhaedrusXY/Arcane_Syntax/releases/tag/v1.2) — download `arcane_syntax_unified-1.2.jar`.

**Current test candidate:** `arcane_syntax_unified-1.3.jar`, built from this source
with Gradle. Install it in place of the older Arcane Syntax JAR on both the client
and server. This update requires no replacement KubeJS files; keep the existing
Eldritch Aeons scripts and the separate Build A Spell Fix installed.

**Version policy:** Use two-part release numbers, starting at **1.2** and advancing to **1.3**, **1.4**, etc. Distributable JARs must follow **`arcane_syntax_unified-X.Y.jar`**; the GitHub release tag is **`vX.Y`**. The filename, embedded NeoForge mod version, Gradle version, and GitHub documentation must agree. Do not append `-fix`, `-test`, or other descriptive suffixes to JAR names. Explain changes in [CHANGELOG.md](CHANGELOG.md) and the release notes.

The earlier CurseForge upload was named **1.1.0**. Legacy `0.2.x` GitHub development builds and their original names are retained only for historical/reproducibility purposes and are superseded by **1.2**. **Renaming an old JAR does not update its embedded version**; use the actual 1.2 release artifact when uploading to CurseForge.

## Arcane Altar's retained purpose

The Eldritch Aeons pack adds a **Thaumaturge infusion recipe** for Build a Spell's Arcane Altar in `pack/kubejs/server_scripts/eldritch_aeons_arcane_syntax_recipes.js`, unlocked with Infused Syntax research. Under the default `disableLegacyCasting=true` setting, the addon hides/disables **Mana Pool** and **Mana Regeneration** enchanting, and permits **Spell Power** enchanting of Thaumaturge wands. Build a Spell continues to execute Syntax spells through its own API after Arcane Syntax pays Vis. Spell Power is read from the held main-hand item in Build a Spell; it is intended to boost its spell damage/effectiveness, including Syntax casts. Confirm the applied enchantment and measured effect in game; the altar is not a new Thaumaturge focus crafting station and this addon does not promise native Thaumaturge spell scaling.

## Target environment

| Component | Current reference |
| --- | --- |
| Minecraft | 26.1.2 |
| NeoForge | 26.1.2.122 |
| Thaumaturge | 1.1.0 |
| Build a Spell | 1.0.3 |
| KubeJS, for the Eldritch Aeons overlay | 26.1.2-8.0.8 in the reported test instance |
| KubeThaum, for the Eldritch Aeons overlay | 1.3.1 |
| Build A Spell Fix, retained separately in the pack | 1.1.2 |

The addon metadata pins Thaumaturge and Build a Spell to these exact versions. KubeThaum is optional in the JAR metadata but required by the included pack's research scripts. Do not combine this candidate with Thaumaturge 1.0.2 or its old version-locked addons.

## Installation and testing

Use a backed-up test instance. Close Minecraft completely before replacing the addon JAR or startup scripts, and keep only one `arcane_syntax_unified` JAR installed. Multiplayer clients and servers need matching files.

The source `pack/` directory is a **reference overlay**, including historical configuration values; do not copy `pack/config` blindly over a tuned instance. The previously supplied incremental 0.2.1 deployment package deliberately leaves configuration alone.

Remove the old 1.0.2 Outer Lands NBT test overrides under `kubejs/data/thaumaturge/structure/outer_lands/` when testing Thaumaturge 1.1.0's native templates. Do not delete the entire Thaumaturge data namespace. No new world is required for the initial compatibility check; use a fresh character/world later to verify early progression.

**Let focus inscription finish before removing the focus from the Focal Manipulator.** Starting inscription is not the same as completing it. Removing a focus early explained the reported missing spell and absence of an eligible focus in the selector. The earlier intermittent mouse-input behavior still needs a controlled retest; it is not established as an addon or upstream defect.

See [testing status](docs/TESTING_STATUS.md), [architecture](docs/ARCHITECTURE.md), [validation boundaries](docs/VALIDATION.md), and [changelog](CHANGELOG.md).

## Source and builds

The current source metadata is Arcane Syntax **1.3**. This candidate uses a full
dependency-resolved Gradle build against the original supported mod JARs. Run
`gradle build` with JDK 25 and the dependencies in `libs/`, or use `tools/build.ps1`
on Windows. To include the original Fix handler audit, supply
`-PshieldFixJar=/absolute/path/to/bas_shield_fix-1.1.2.jar`.

The published 1.2 release JAR was an offline resource/metadata repackage of the
preserved 0.2.1 compatibility candidate. Its historical packaging workflow is now
manual-only so new source pushes cannot overwrite that release. Third-party
dependency JARs, game saves, account files, and raw player logs are not part of
this repository.

Historical 0.2.1/1.2 packages were **offline compatibility ports**. Initial user
testing confirmed loading and research visibility for those packages. The current
source additionally passes the original-dependency compatibility audit; see
[testing status](docs/TESTING_STATUS.md) for the distinction between automated
checks and pending live gameplay verification.

The repository contains original integration code under the [MIT License](LICENSE). Third-party mods and referenced assets retain their own licenses. This project is not an official release of Thaumaturge or Build a Spell.
