# Fresh-world acceptance tests — 0.2.0

## 1. Load and retirement smoke test

Start the copied instance normally. Confirm only one Unified Casting JAR loads,
with version 0.2.0. Confirm no fatal Mixin errors and no KubeJS errors. Search the
log for `[Arcane Syntax 2.0.0] Focus milestones active` and the addon startup line.
The old mana bar should be hidden. Old BaS editor/slot/ring shortcuts should do
nothing. Spawn an old wand solely to verify its right-click refuses casting and
that it does NOT change `/ea_arcane_syntax_status` for a fresh player. Remove it
from the test inventory afterward. Do not use research-all for the progression
acceptance run; it hides prerequisite problems.

## 2. Foundation progression

Complete native alchemy/auromancy prerequisites, craft the Lesser Focus through
its native crucible recipe, and click Complete on Resonant Casting. Confirm Cast
is known, two starter Blank Runes arrive once, and further Blank Runes can be
crafted at the Arcane Workbench. Complete Lexical Foundations. Inscribe and learn
Self and Night Vision (or another Foundation effect). Duplicate runes should not
be consumed. Complete the native Basic Auromancy stage to unlock the Focal
Manipulator, and inscribe Origin -> Syntax: Self -> Syntax: Night Vision, Instant.

Socket this focus in a charged native wand; cast in Survival. Confirm the effect,
Vis debit, and unchanged BaS mana in the diagnostics. Creative bypasses knowledge
and Vis payment, so it cannot establish survival balance or rune gating.

## 3. Structured and Infused migration

Names and Natures should unlock Advanced Focus at the Arcane Workbench, using a
Lesser Focus. Structured Syntax should ask for Advanced Focus, not Carved Wand.
Try to learn an Infused rune early: it must refuse without consuming the item.
At native Infusion + Infused Syntax, craft Greater Focus using Advanced Focus.
Runic Mastery should ask for Greater Focus, not Runic Wand. No primordial pearl
or fourth-tier item should appear in this new path. Draconic Artifice should ask
for Greater Focus as its equipment milestone. Native focus research pages should
show the corresponding replacement recipes.

## 4. Actual focus-tier enforcement

Learn components from all tiers. A Lesser Focus must still reject a Structured
component, and Advanced must reject an Infused component, even in Creative. Test
both inscription and a pre-existing/edited illegal focus at casting time. Greater
must accept valid Infused compositions within its ordinary complexity budget.
Saved earned knowledge should survive storing or upgrading a focus and relogging.

## 5. Cost and combination checks

Try Break + Fill: editor/inscription must refuse. It must not spend Vis at casting
if a formerly inscribed focus contains the combination. Break + Increased Area
should remain valid in a suitable focus tier. For a valid spell, deliberately
leave one aspect low and confirm the failure reports that aspect's have/need.
Refill all required pools, retry, and compare logged centivis debit with native
cap/gear discounts. Conversion remains 0.1 total Vis per raw mana.

## 6. Potency and enchanting

Compare otherwise equivalent casts using the three focus tiers while holding the
same wand. Configured +6/+15/+30 tier bonuses should remain, without old BaS wand
discounts. Arcane Altar should show only Spell Power, accept a native wand, and
reject Mana Pool/Regeneration requests. Compare damage before/after a Spell Power
upgrade; verify it works on native wands rather than merely displaying an enchant.

## 7. Native and multiplayer regression checks

Check ordinary native Thaumaturge focuses still cast, focus swapping works, and
Vis charging/pedestals remain native. Mixed native/Syntax trees are still rejected.
Check unlearning is not triggered by login or inventory changes. For multiplayer,
test with the same scripts/addon on both sides and confirm the client palette,
server inscription validation, and server casting validation agree.

## Report failures

Keep the new `latest.log`, KubeJS server/client logs and any crash report. Include
whether the failure occurred at startup, research completion, inscription,
socketing, or casting, and the actual focus tier/composition. This candidate has
not been launched in Minecraft here, so the first smoke test matters.
