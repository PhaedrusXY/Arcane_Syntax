# Contributing

Start with [Architecture](docs/ARCHITECTURE.md), [Compatibility](docs/COMPATIBILITY.md), and [Testing status](docs/TESTING_STATUS.md).

Keep the addon mod ID `arcane_syntax_unified`, saved-data namespaces, item IDs and research IDs stable unless a deliberate migration is supplied. The repository name is not a reason to rename them.

Run the dependency-free core tests and pack-script mocks before submitting changes. For game-facing changes, also build against the exact original dependency JARs and test a copied instance. Passing mocks or reaching the title screen is not sufficient evidence of gameplay correctness.

Do not commit dependency JARs, logs containing private data, world saves, credentials, launcher accounts, or local environment files. The `deployment/` and `dist/` directories intentionally contain only the integration's own published test artifacts.

When changing a component tier, update the Java tier rules, startup catalog, research/recipe placement and tests together. Keep pack-specific gameplay tuning explicit. Profile before describing a KubeJS-to-Java rewrite as a performance optimization.

Bug reports should state exact mod versions, whether the focus completed inscription, whether the behavior also occurs with a native Thaumaturge spell, and whether the addon was present. Attach the relevant error excerpt and reproducible steps; redact unrelated personal information.
