# 0.2.1 integration boundaries

The addon owns focus composition validation, native casting interception, Vis
payment/refunds, focus power bonuses and retirement of the personal-mana route.
Five WandVisHelper names are ported to 1.1.0; currency math remains unchanged.

KubeJS retains kubejs: item registration, rune learning/milestone events, recipe
replacement, research registration, tooltips and JEI hiding. Keeping registration
IDs avoids changing existing item stacks and recipe/research references. The
learning scripts are event-driven; a Java rewrite has no established performance
benefit in the absence of profiling. This update deliberately avoids broadening
the scope of an API migration into a full native progression rewrite.

Static resources now live in src/main/resources under their original namespaces.
The namespace need not equal the addon mod ID. Existing native research overrides
retain their original IDs. Client script language callbacks were replaced with
native en_us JSON. Configurations and unrelated pack mechanics are unchanged.

Conjure's tier is defined consistently in TierRules.java and the startup component
catalog; its recipe dynamically reads the catalog's lexical_foundations gate.
The research script moves its recipe page to Foundation. Tests enforce agreement.

No native Thaumaturge spell engine or Outer Lands world generator is replaced.
Syntax/native component mixing, branches and charged/channelled Syntax remain
unsupported. Build A Spell Fix stays a separate dependency in the pack.
