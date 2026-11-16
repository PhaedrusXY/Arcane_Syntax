# Validation — Arcane Syntax Unified 0.2.0

## What was checked

- Java source compilation completed with javac 21 against exact supplied BaS
  1.0.3 and Thaumaturge 1.0.2 declaration inputs and external compile-time stubs.
  The original Java 25 dependency class headers were adjusted only in TEMPORARY
  declaration copies so javac 21 could read signatures; those copies were not
  executed and are not included. The originals remain unmodified.
- 4,650 assertions passed for pure compiler, grammar, cost conversion, payment
  receipt/refund, all 76 tier mappings and preservation of all 19 shipped combo
  compositions. This is not an execution test of those combos.
- 958 assertions passed using the actual pack JavaScript with API-shaped mocks:
  focus milestones, rune learning/refusal/duplicates, save flags, no repeated
  grants/syncs, recipe registration, all rune materials, and research/language.
- All JavaScript syntax checks passed with Node.js. This does not validate every
  Rhino/KubeJS binding at runtime.
- Static dependency/resource audit examined 218 native/custom research entries,
  597 recipe definitions/registrations, 19 nodes in the affected parent closure,
  and 32 Syntax book recipe references. It found no remaining old-wand research
  dependencies, introduced parent cycles, missing Syntax recipe references, or
  focus-recipe self-dependencies in the inspected files.
- Binary signature audit: 29 addon classes, 179 distinct own/mod references,
  35 external symbolic references matched against supplied binaries, 19 injection
  targets and 8 shadow fields. No missing supplied-mod members or mismatched
  injection/field signatures were found. See ABI_REPORT.json for exact hashes.
- One additional external field access, Button.visible:boolean (inherited GUI
  visibility), is not independently matched to an exact owner descriptor in the
  supplied binaries. It remains an external runtime linkage assumption along
  with the compile-time external declarations. This is not full ABI proof.
- JSON/TOML parsing, archive CRCs, package paths and exclusion of dependencies,
  stubs and unrelated server files were checked during packaging.

## What was NOT checked

No Minecraft client, integrated server, dedicated server, native registry/datapack
reload, Mixin transformation, GUI interaction, network synchronization, or live
world progression was run. No normal dependency-resolved NeoForge build completed
in this environment because the required toolchain/dependencies were unavailable.
The original 0.1.0 working in the user's instance is useful prior evidence, not a
live test of these new changes. Treat this as an experimental candidate.

The included full build project targets JDK 25, ModDevGradle 2.0.148 and NeoForge
26.1.2.122. A successful normal source build would strengthen linkage validation
but would still not replace the live acceptance tests in TEST_PLAN.md.
