# Testing status

## Unreleased component compatibility validation (2026-11-17)

The current source adds shared modifier applicability validation and contextual
Focal Manipulator filtering. The published **1.2 JAR predates these changes**;
this work has not replaced that release or produced a new published build.

### Completed checks

- Full `compileJava` against the original Build a Spell **1.0.3** and Thaumaturge
  **1.1.0** JARs, Minecraft **26.1.2**, and NeoForge **26.1.2.122**: passed.
- Gradle **9.2.1** `check` using JDK **25.0.5+8**, with the original Build A Spell
  Fix **1.1.2** JAR supplied through `-PshieldFixJar`: passed.
- Compatibility suite: **21,884 assertions passed**. This includes all **7,238**
  delivery/effect/modifier triples through the native-node compiler and the real
  upstream rule class: **2,821 allowed / 4,417 rejected** before Mixin application.
- Original Fix handler: checked across all **7,238** triples, with exactly **14**
  cancellations for Fill + Break or Fill + Evaporate Water. This calls the real
  handler and Mixin callback class; it does not bootstrap or prove game injection.
- Core compiler/currency/receipt/tier/composition suite: **4,659 assertions passed**,
  both standalone and under Gradle.
- Pack-script suite: **971 assertions passed** using the real scripts with
  API-shaped mocks.
- Released Thaumaturge 1.1.0 bytecode inspection confirmed the new client Mixin
  field/method targets and the native placement operations used by the preview.
  Its inscription path checks spell validity before removing XP or crystals.

See the [complete compatibility audit](COMPONENT_COMPATIBILITY.md) for source
links, exact dependency hashes, all 47 effect rows, and the test commands. These
checks establish compilation and rule delegation; they do not cast every spell
or establish live gameplay compatibility.

### Remaining release checks in a copied game instance

- [ ] Launch a client and dedicated server with the supported dependencies and
  confirm all Mixins apply; keep the new screen Mixin client-only.
- [ ] Under Self + Shield, verify Increased Area remains available while Increased
  Power and Prolonged are unavailable. Change selection and edit/delete nodes to
  verify the palette refreshes and invalid saved foci remain repairable.
- [ ] Build Shield + Increased Area + Damage + Increased Power. Verify inserting
  Shield immediately before an existing Increased Power is blocked because that
  insertion would rebind the modifier.
- [ ] Verify projectile modifiers are available under Cast/Tracking and unavailable
  under Self. Verify delivery modifiers such as Delay still work with Shield.
- [ ] With the Fix installed, verify Fill + Break and Fill + Evaporate Water are
  unavailable while Conjure + Fill remains available.
- [ ] Attempt to inscribe an incompatible saved composition: verify a useful error
  and no XP/crystal consumption. Attempt to cast a previously inscribed invalid
  focus: verify an error and no Vis consumption, with its components preserved.
- [ ] Inscribe and cast valid Syntax and native Thaumaturge spells, verify normal
  costs, then save/reopen and repeat on a dedicated server.

## 1.2 naming/packaging and validation

- Current release numbering aligns with the previously uploaded CurseForge version `1.1.0` by using the simplified **`1.2`** sequence. The canonical download and in-JAR NeoForge metadata should both read **1.2**.
- Version **1.2** contains the same two corrected Auromancy research positions as the previous 0.2.2 development candidate; no gameplay behavior or progression dependencies were deliberately changed.
- This is still an experimental, resource/metadata-packaged compatibility build rather than a full NeoForge recompilation. Check the GitHub Actions release workflow and JAR's embedded metadata before distributing.
- In-game layout, native/Syntax casting, Arcane Altar enchanting, and client/server testing remain pending.

## 0.2.2 packaging verification (2026-11-16)

- GitHub Actions successfully generated and published `arcane_syntax_unified-0.2.2.jar` with the internal mod version synchronized to 0.2.2.
- The packaging script compares decompressed ZIP entries against the base 0.2.1 compatibility build. It permits changes only to the two focus research JSON files and version-identifying metadata/log banner. All other game/recipe/Java payloads are byte-identical.
- In-game verification of the Advanced/Greater Foci research positions, Arcane Altar Spell Power effects, and broader gameplay remains outstanding. The previous 0.2.1 runtime test observations below do not establish 0.2.2 gameplay compatibility.

## Maintainer reports through 2026-11-15

| Area | Evidence and status |
| --- | --- |
| Addon/world loading | The updated 0.2.1 addon and existing single-player world loaded with Thaumaturge 1.1.0 and updated companion mods. |
| Research | Updated custom entries appeared, including the newly incomplete **Two Grammars** entry. A previous unlock-all command did not complete an entry added afterward. |
| Focus inscription | A focus was removed before the timed inscription completed. The maintainer identified that as the cause of the apparent missing spell. This is not evidence of a persistence-code fix. |
| Overall experience | The maintainer reported that things appeared generally functional and planned further testing. This is a preliminary report, not comprehensive certification. |
| Outer Lands | Portal entry succeeded after upgrading Thaumaturge and companions while the addon was removed. Earlier template overrides were still installed during that successful trial, so it was not a clean test of native 1.1.0 templates. The addon does not claim to fix the portal. |
| Right-click/focus selector | Intermittent right-click failure followed the original middle-mouse focus binding; alt-tab restored input. A keyboard rebind avoided the observed mouse interference but did not initially show the selector. A stuck input-state mechanism is a hypothesis, not a confirmed diagnosis. Retest with a fully inscribed focus. |

## Reported checks from 0.2.1 package preparation

`bash tools/test_core.sh` passed **4,656 assertions** on dependency-free compiler/currency/receipt/tier/composition logic.

`node tools/test_pack.cjs` passed **971 assertions** using the real pack scripts with API-shaped mocks.

These checks do not launch Minecraft, apply runtime Mixins, render the UI, or test live KubeThaum event execution. These are the recorded results from preparing the previously supplied package, not new gameplay tests or a new build. Publishing documentation does not change the distributed JAR.

## Next gameplay checks

- [ ] Hold the keyboard focus-switch key with a completed, inscribed focus in ordinary inventory; equip/remove it and switch between two foci.
- [ ] Eat/use another item immediately afterward; repeat the selector operation and verify ordinary input is still usable.
- [ ] Inscribe and cast a simple Syntax spell through a charged native wand; verify Vis payment and no personal-mana payment.
- [ ] Test a native Thaumaturge spell separately.
- [ ] On a character with only Foundation progression, learn Conjure and use it with Wall/Floor in a Lesser Focus.
- [ ] Verify Lesser Focus rejects a known Structured component and Break + Fill is rejected before payment.
- [ ] Verify Advanced/Greater Focus and Draconic Artifice research milestones without legacy Build a Spell wands.
- [ ] Visually verify Advanced Foci at (2, -4) and Greater Foci at (4, -3) in Auromancy with v1.2.
- [ ] Enchant a Thaumaturge wand with Spell Power I at the Arcane Altar, keep it in main hand, and compare the same Arcane Syntax damage effect against the same target with an unenchanted wand and equal focus tier. Verify Mana Pool / Mana Regeneration options remain hidden.
- [ ] Retest persistence across save/reopen after a completed inscription.
- [ ] Verify dedicated-server/client parity.
- [ ] Test a newly generated Outer Lands labyrinth after removing only the old template patches.

Use the existing backed-up sandbox for loading/casting checks. Use a fresh character/world for progression tests; unlock-all characters do not prove research gates.

## Separate observations

The supplied session logs reported zero startup/client/server script-load errors. They also contained unrelated Twisted Mobs recipes referencing `twisted_mobs:deleted_mod_element` and JEI-related errors. These observations are not proof that all integration code works, and no unrelated recipe/JEI repair is included in 0.2.1.

These historical package reports did not establish full dependency-resolved
NeoForge compilation or exact-release binary linkage. Current source validation
is recorded separately above. Exhaustive gameplay testing and performance
benchmarking remain unestablished.
