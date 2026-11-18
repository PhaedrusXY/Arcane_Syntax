# Component compatibility audit

This audit targets **Build a Spell 1.0.3 for Minecraft 26.1.2**, with the pack's
**Build A Spell Fix 1.1.2** overlay. It documents the compatibility rules used by
Arcane Syntax, not a rebalance of the spell effects.

## Evidence and supported dependency

The upstream `v1.0.3` tag resolves to commit
`7e56f0a18dd10a560d0c948fda01ba45f925781a`. This is also the source commit examined
for this audit. The original `buildaspell-1.0.3-mc26.1.2.jar` has SHA-256
`b480ad587907c01b4f0e5e1f09b39b1c14d575cbd9b5798a9f59bc13cc61ed86`.

| Source | What it establishes |
| --- | --- |
| [ModifierApplicability.java](https://github.com/CyberDay1/CybersBuildASpell/blob/v1.0.3/src/main/java/buildaspell/spell/ModifierApplicability.java) | Allowed effect/modifier/delivery combinations and modifier scope |
| [SpellBuilderScreen.java](https://github.com/CyberDay1/CybersBuildASpell/blob/v1.0.3/src/main/java/buildaspell/client/gui/SpellBuilderScreen.java) | How the original editor calls those rules before adding a modifier |
| [Spell.java](https://github.com/CyberDay1/CybersBuildASpell/blob/v1.0.3/src/main/java/buildaspell/spell/Spell.java) | Delivery-modifier routing, counts, stacking, and costs |
| [BuildASpellAPI.java](https://github.com/CyberDay1/CybersBuildASpell/blob/v1.0.3/src/main/java/buildaspell/api/BuildASpellAPI.java) | Spell construction and dispatch contract |
| [SPELL_COMPONENTS.md](https://github.com/CyberDay1/CybersBuildASpell/blob/v1.0.3/docs/SPELL_COMPONENTS.md) | Human-readable component behavior and mechanics |
| [CROSS_MOD_API.md](https://github.com/CyberDay1/CybersBuildASpell/blob/v1.0.3/docs/CROSS_MOD_API.md) | Integration API usage and live ID enumeration |
| [Build A Spell Fix file](https://www.curseforge.com/minecraft/mc-mods/build-a-spell-fix/files/9495526) | The pack's `bas_shield_fix-1.1.2.jar`, displayed on CurseForge as BAS fix v1.3 |

`ModifierApplicability` is a public Java class, but it is **not** part of the
upstream promised stable API. `BuildASpellAPI` is the stable integration facade;
its Javadoc treats the other implementation classes as internal. This adapter is
therefore version-specific and must be checked when updating Build a Spell.

## Why API construction was insufficient

`BuildASpellAPI.createSpell` resolves IDs and delegates list caps and
non-stackable duplicate handling to `Spell.addComponent`. It does **not** check
modifier applicability. Thus a syntactically valid API spell can contain an
ineffective modifier that the original interactive editor would reject.

Arcane Syntax's `ComponentCompatibility.validate` calls the loaded dependency's
rule methods. It does not maintain a second production compatibility table.
Effect-specific modifiers are checked against the preceding effect. Delivery
modifiers are checked against the delivery, regardless of where they appear in
the ordered API list.

Validation is read-only. Rejected spells retain their saved components and need
editing; the validator does not silently remove components or change their
meaning. The shared preparation path validates before producing an executable
spell or charging Vis. The editor uses the same semantic check for drafts.
Existing learning, enabled-component, grammar, focus-tier, and explicit pack
restrictions remain separate checks. In particular, the pack's existing global
Break + Fill restriction can be stricter than a single effect/modifier pair.

## Modifier scope

There are **47 effects, 22 modifiers, and 7 delivery methods** in this version.
The delivery methods are `rune`, `sight`, `self`, `cast`, `tracking`, `touch`, and
`trap`.

| Modifier scope | IDs | Upstream requirement |
| --- | --- | --- |
| Delivery: projectile | `double`, `split`, `accelerate`, `pierce`, `bounce`, `return`, `chain` | `cast` or `tracking` delivery |
| Delivery: universal | `duration`, `delay`, `echo`, `linger` | Any of the seven deliveries |
| Effect-specific | `increased_area`, `increased_power`, `nullify`, `gentleness`, `fortunate_son`, `prolonged`, `wall`, `floor`, `fill`, `leech`, `sunder` | Must appear in the effect's table below |

The first two rows contain 11 delivery modifiers. They remain meaningful at the
delivery level even when an effect's individual row is empty. For example, Mark
has no effect-specific modifiers, but the upstream editor still permits Delay.

## Complete upstream effect-specific table

This is a review snapshot, **not the rule table used by production code**.
Delivery modifiers listed above are considered separately. The installed Fix's
Fill exclusions are described immediately after the table.

| Effect ID | Allowed effect-specific modifiers in upstream 1.0.3 |
| --- | --- |
| `damage` | `increased_power`, `increased_area`, `nullify`, `fortunate_son`, `leech`, `sunder` |
| `ignite` | `increased_power`, `increased_area`, `prolonged` |
| `freeze` | `increased_power`, `increased_area`, `prolonged` |
| `teleport` | `increased_area` |
| `pull` | `increased_power`, `increased_area` |
| `push` | `increased_power`, `increased_area` |
| `yeet` | `increased_power`, `increased_area` |
| `reap` | `increased_area`, `fortunate_son`, `gentleness` |
| `explosion` | `increased_power`, `increased_area`, `nullify` |
| `heal` | `increased_power`, `increased_area`, `nullify`, `fortunate_son` |
| `lightning` | `increased_power`, `increased_area`, `nullify` |
| `poison` | `increased_power`, `increased_area`, `prolonged` |
| `wither` | `increased_power`, `increased_area`, `prolonged` |
| `saturation` | `increased_power`, `increased_area`, `prolonged` |
| `launch` | `increased_power`, `increased_area` |
| `light` | `increased_power`, `increased_area` |
| `slam` | `increased_power`, `increased_area` |
| `levitation` | `increased_power`, `increased_area`, `prolonged` |
| `slow_fall` | `increased_power`, `increased_area`, `prolonged` |
| `break` | `increased_power`, `increased_area`, `gentleness`, `fortunate_son`, `wall`, `floor`, `fill` |
| `invisibility` | `increased_power`, `increased_area`, `prolonged` |
| `speed` | `increased_power`, `increased_area`, `prolonged` |
| `haste` | `increased_power`, `increased_area`, `prolonged` |
| `blink` | `increased_power` |
| `swap` | `increased_area` |
| `summon` | `increased_power` |
| `create_water` | `increased_area`, `wall`, `floor`, `fill` |
| `evaporate_water` | `increased_area`, `wall`, `floor`, `fill` |
| `mark` | None |
| `recall` | None |
| `pickup` | `increased_area` |
| `shield` | `increased_area` |
| `conjure` | `increased_area`, `wall`, `floor`, `fill` |
| `growth` | `increased_power`, `increased_area`, `prolonged` |
| `cleanse` | `increased_area` |
| `charm` | `increased_power`, `increased_area`, `prolonged` |
| `blind` | `increased_power`, `increased_area`, `prolonged` |
| `slow` | `increased_power`, `increased_area`, `prolonged` |
| `weaken` | `increased_power`, `increased_area`, `prolonged` |
| `strengthen` | `increased_power`, `increased_area`, `prolonged` |
| `regenerate` | `increased_power`, `increased_area`, `prolonged` |
| `resist` | `increased_power`, `increased_area`, `prolonged` |
| `night_vision` | `increased_area`, `prolonged` |
| `water_breathing` | `increased_area`, `prolonged` |
| `root` | `increased_power`, `increased_area`, `prolonged` |
| `grapple` | `increased_power` |
| `gust` | `increased_power`, `increased_area` |

### Installed Build A Spell Fix overlay

The verified `bas_shield_fix-1.1.2.jar` has SHA-256
`36fde00acb09a73deb887d456ecfd5386f00ad5491c8fc5fb7e25688f8554210`.
Its `ModifierApplicabilityMixin` injects at the head of `isUseful` and returns
false for **Fill + Break** and **Fill + Evaporate Water**. It leaves other pairs
unchanged. Conjure + Fill remains allowed.

Calling the loaded helper is important: after the installed Fix's Mixin has
applied, the same call used by the original editor includes those two exclusions.
Copying the unmodified upstream table would miss them. This document's upstream
row for Break/Evaporate Water therefore does not by itself describe the final
pack allowance.

The Fix also changes effect execution, including Shield's absorption upgrade
behavior and construction effects. Applicability parity does not replace those
execution patches.

## Audit and regression coverage

`ComponentCompatibilityTests` is an executable test main under
`src/test/java/com/phaedrusxy/arcanesyntax/bridge/`. It uses the original dependency
JAR and verifies its SHA-256 before reading the real enums and rule class.

The suite covers:

- Catalog parity for all 76 component IDs and every modifier's stackability.
- All **7,238** delivery/effect/modifier triples, compiling each through the
  Arcane Syntax native-node compiler before testing semantic validation.
- Independent acceptance/rejection cases for Shield, movement, construction,
  damage, healing, buffs, and projectile-dependent modifiers.
- Multiple effects in one chain, including a compatible earlier/later effect
  that must not rescue an incompatible modifier on Shield.
- Delivery modifiers interleaved with effect groups without changing the
  preceding-effect binding.
- Three separate modifier nodes versus one three-stack node.
- Input preservation for both successful and rejected validation.

The original, untransformed upstream table permits **2,821** of those triples
and rejects **4,417**. Applying just the Fix's two Fill exclusions would remove
14 allowed triples, yielding **2,807 allowed and 4,431 rejected**. The latter is
a derived rule count, not an assertion that a live transformed game was tested.

An optional `arcaneSyntax.testShieldFix=true` test directly invokes the original
Fix handler with Mixin's real `CallbackInfoReturnable` across all 7,238 triples.
It checks exactly 14 cancellations. This is a test of the handler's contract;
it does **not** bootstrap Mixin or prove that the injection applied in Minecraft.

### Running the suite

Use JDK 25 and the repository's normal NeoForge build dependencies. Place the
unmodified supported Build a Spell and Thaumaturge JARs in `libs/` as required by
`build.gradle`, then run:

```sh
gradle compatibilityTest
```

The Gradle `check` task includes this test. The optional Fix handler check also
requires the original Fix JAR on the test runtime classpath and the system
property on the **test JVM**, not only on the Gradle daemon. No bundled mock
Minecraft classes or copied gameplay implementations are used.

The task wires both automatically when the original Fix JAR path is supplied:

```sh
gradle compatibilityTest -PshieldFixJar=/absolute/path/to/bas_shield_fix-1.1.2.jar
```

### What these tests do not establish

A rule matrix audit tests which combinations are accepted. It does not cast all
7,238 combinations or establish that every upstream effect correctly implements
its documentation. Actual behavior also depends on delivery, per-effect
execution, server configuration, datapacks, other mods, and the game state.

A real client/server verification must still establish that the editor Mixins
load, candidate filtering refreshes after graph changes, server inscription
rejects invalid spells before consuming materials, and a previously saved
invalid focus fails without consuming Vis. It must also verify that the Fix's
Mixin exclusions reach the shared helper in the running game. Report those
checks separately from the Java compatibility suite.
