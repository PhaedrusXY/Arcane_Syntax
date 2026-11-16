# 0.2.1 — Thaumaturge 1.1.0 compatibility test

- Retarget dependency metadata and five Vis helper calls for 1.1.0.
- Conjure moved to Foundation across item definitions, research, learning and focus validation.
- Retain narrative polish/Two Grammars and update construction-tier wording.
- Bundle 76 textures, six datapack overrides and 42 translations in the addon.
- Supply narrow incremental deployment without overwriting user configuration.
- Retire the 1.0.2-only Outer Lands room-template patches.
- Offline core/script tests passed; full compilation and game validation pending.

---

# Changelog

## 0.2.0 — full focus-progression migration candidate

- Foundation / Structured / Infused equipment gates now use Lesser / Advanced /
  Greater Thaumaturge foci. Server inscription and casting enforce the actual tier.
- Rewired Resonant Casting, Structured Syntax, Runic Mastery and the downstream
  Draconic Artifice requirement. No physical BaS wand advances a new character.
- Transferred the prior carved/runic upgrade recipe materials to Advanced/Greater
  foci and reconciled their native research pages, avoiding a late primordial-
  pearl dependency. Native Lesser Focus recipe is retained.
- Kept all 75 rune identities, material recipes and tiers, plus initial Cast.
  Permanent research IDs/stage counts and existing knowledge are not wiped.
- Retired old BaS wand recipes/JEI entries, right-click casting, mana-paid shortcut
  dispatch, stock editor/key actions, starter grants and random-rune learning.
- Hid the personal mana HUD by default. Old key bindings/data remain registered
  for compatibility rather than being destructively removed.
- Mapped configured +6/+15/+30 wand potency bonuses to held native focus tiers.
- Retained Arcane Altar for Spell Power, added native wand support, and removed
  its mana-enchantment choices. Mana enchantments use an empty supported-item tag;
  existing items/books are not deleted.
- Reject Break + Fill before inscription or payment; keep Break + Increased Area.
- Added aspect-specific insufficient-Vis diagnostics. Kept the 0.1 conversion,
  native cap/gear discounts, no ambient fallback, and no BaS mana consumption.
- Neutralized the previous Runic Mastery overlay scripts under their same names.
- Added core/pack/dependency tests and recorded exact-binary signature checks.

Remaining constraints: Instant-only, linear Syntax-only compositions; native
spells remain separate; no live game validation here; Chain/Break engine ordering
is unchanged. See VALIDATION.md.
