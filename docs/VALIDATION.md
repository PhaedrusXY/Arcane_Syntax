# 0.2.1 validation record

## Executed

- Dependency-free core compiled using javac --release 21: 4,656 assertions passed.
- Actual pack scripts executed against API-shaped mocks: 971 assertions passed.
- Conjure's tier, research requirement and book-recipe placement changed together.
  All rune IDs and recipe material/cost definitions were preserved.
- Five compiled WandVisHelper member references renamed; each descriptor is
  unchanged, and SyntaxBridge bytecode after the constant pool is byte-identical
  to 0.2.0. This is a binary symbol update, not an instruction rewrite.
- Test classes, Minecraft/NeoForge classes and third-party mod classes excluded
  from the distributed JAR. No Outer Lands NBT files are included.
- Source and dependency metadata target Thaumaturge 1.1.0 and Build a Spell 1.0.3.

- Final packaged JAR placed first on the test classpath: the same 4,656 core
  assertions passed. A separately reproduced JAR had identical uncompressed
  entries. All 86 JSON resources parsed, metadata and JavaScript syntax checks
  passed, and payload hashes/ZIP CRC checks passed.

## Public-source audit

Thaumaturge's inspected main branch reports mod_version=1.1.0. The renamed helper
methods preserve the required parameter and return types:

| 1.0.2 symbol | 1.1.0 symbol |
| --- | --- |
| getAllVis | chargeOf |
| setAllVis | writeCharge |
| consumeAllVis | payCosts |
| getConsumptionModifier | costFactor |
| getVis | storedIn |

The source-level spell APIs consulted include SpellCasting, SpellAnalyzer,
SpellEngine, Spells, SpellSummary, SpellProblem, SpellCastEvent, FocusItems,
ItemWand, WandVis and PartPalette. Reading public source is NOT equivalent to
checking the exact released binary or running a transformed game.

Primary sources (consulted 2026-11-14):
- Thaumaturge 1.1.0 release: https://www.curseforge.com/minecraft/mc-mods/thaumaturge/files/9428045
- KubeThaum 1.3.1 release: https://www.curseforge.com/minecraft/mc-mods/kubethaum/files/9492058
- Source version: https://github.com/Leclowndu93150/Thaumaturge/blob/main/gradle.properties
- Helper API: https://github.com/Leclowndu93150/Thaumaturge/blob/main/src/main/java/com/leclowndu93150/thaumaturge/content/wands/WandVisHelper.java

## Not executed / not established

- Full dependency-resolved Minecraft/NeoForge build.
- Linkage validation against the released Thaumaturge 1.1.0 JAR.
- Runtime Mixin application, title-screen launch, world loading or spell execution.
- KubeThaum 1.3.x event execution or Thaumonomicon page rendering.
- Windows installer execution.
- Performance benchmarking. Resource consolidation is not evidence of improved FPS.

The shipped JAR is explicitly an experimental offline compatibility candidate.
Its base JAR is the prior 0.2.0 candidate; that artifact was itself compiled with
minimal compile-time platform substitutes, not a resolved game build. Those
substitutes are not in this distribution. Only core classes were newly compiled
here. See BUILD_VALIDATION.json for exact hashes and changed references.
