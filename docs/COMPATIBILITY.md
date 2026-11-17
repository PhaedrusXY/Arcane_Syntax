# Compatibility

## Target of Arcane Syntax 1.2

| Component | Declared constraint / observed test version |
| --- | --- |
| Minecraft | Exactly 26.1.2 |
| NeoForge | Metadata range `[26.1.2.122,26.2)`; observed 26.1.2.122 |
| Thaumaturge | Exactly 1.1.0 |
| Build a Spell | Exactly 1.0.3 |
| Build A Spell Fix | Optional addon dependency, exactly 1.1.2 when present; retained in Eldritch Aeons |
| KubeThaum | Optional for the JAR, range `[1.3,1.4)` when present; required by the research scripts, observed 1.3.1 |
| KubeJS | Required by the pack layer; observed 26.1.2-8.0.8 |
| Java | JDK 25 requested by the full Gradle build; dependency-free core checks use Java 21+ |

The pack integration additionally uses Occultism/Occultism KubeJS for ritual recipes and Ice and Fire for Draconic Artifice. Retain the matching Eldritch Aeons dependencies; the addon JAR alone is not the complete curated progression system.

Metadata acceptance is not a compatibility guarantee. The newer Thaumaturge API required five Vis-helper symbol changes; loosening a version range by itself would not have implemented those changes. Future Thaumaturge versions are not claimed compatible.

## Preserved boundaries

- Native wands and foci; native Vis storage/recharge, cap and equipment discounts.
- Syntax uses one delivery and a linear chain with Instant casting.
- Native and Syntax components do not mix within one spell.
- No replacement Outer Lands generator or patched room templates are included.
- Build a Spell remains installed. Retiring its separate player-casting route does not remove its spell engine.
- Existing registrations and saved knowledge remain. Removing the JAR or downgrading is not a safe substitute for restoring a matching world/instance backup.

## Performance

Static resources were consolidated for maintenance and packaging. No frame-rate, tick-time or memory benchmark establishes an improvement. Rune learning, progression and recipes remain event-driven KubeJS; moving them to Java is not currently a measured optimization.
