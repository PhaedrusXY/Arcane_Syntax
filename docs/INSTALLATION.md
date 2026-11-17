# Installation and migration

## Current addon test release: 0.2.2

Download [`arcane_syntax_unified-0.2.2.jar`](https://github.com/PhaedrusXY/Arcane_Syntax/releases/download/v0.2.2/arcane_syntax_unified-0.2.2.jar) from the [GitHub 0.2.2 prerelease](https://github.com/PhaedrusXY/Arcane_Syntax/releases/tag/v0.2.2). The **filename and internal mod metadata both report 0.2.2**. This replaces either older 0.2.1 test JAR, including the superseded `0.2.1-auromancy-layout-fix` prerelease.

For a working 0.2.1 installation, close Minecraft and replace **only** the Arcane Syntax JAR in `mods/`; restart the game completely. All recipes, scripts, configs, dependencies, and saved progression remain unchanged in this JAR-only correction. Do not rerun the historical 0.2.1 installer, which contains the older JAR. In multiplayer, install the identical JAR on client and dedicated server.

The JAR is still a compatibility test build, not a full NeoForge rebuild or gameplay-certified release. No new world is required for the visual layout correction. Confirm the Advanced/Greater Focus positions in the Auromancy tab after launch.

## Historical 0.2.1 incremental deployment

## Use the right package

`deployment/0.2.1/` and the original ZIP under `dist/0.2.1/` are the **incremental update from the existing 0.2.0 Eldritch Aeons focus migration**. They intentionally do not contain every script or overwrite configuration. `pack/` is a fuller reference snapshot, not a one-click fresh modpack installer.

1. Back up the test instance and world. Close Minecraft completely; stop a dedicated server when used.
2. Keep Thaumaturge 1.1.0, Build a Spell 1.0.3, compatible KubeJS/KubeThaum and the updated companion mods.
3. Remove older `arcane_syntax_unified*.jar` files from the instance's `mods/` folder. Install only the supplied 0.2.1 JAR.
4. Merge the deployment overlay's `mods/` and `kubejs/` folders into the instance, overwriting matching files. Do not replace whole folders or copy `pack/config/` over current settings.
5. Remove only the earlier 1.0.2 Outer Lands template-fix files listed in [`REMOVE_OLD_PORTAL_PATCHES.txt`](../deployment/0.2.1/REMOVE_OLD_PORTAL_PATCHES.txt). They are under `kubejs/data/thaumaturge/structure/outer_lands/`. Keep unrelated Thaumaturge data/research overrides.
6. Optional: remove identical loose static files listed in [`MIGRATED_STATIC_FILES.txt`](../deployment/0.2.1/MIGRATED_STATIC_FILES.txt); preserve deliberately customized versions for review.
7. Fully restart Minecraft. Do not use `/reload` for this migration. For multiplayer, match the addon/dependencies and pack layer on both sides.

No new world is required by the intended migration. Continue in a backed-up sandbox to test functionality, then use a fresh character/world to test early progression. That is not a guarantee of downgrade safety.

## Optional game installer

Extract the original deployment ZIP outside the instance. The supplied `Install-Update.ps1` supports a preview:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\Install-Update.ps1 -InstancePath 'C:\path\to\Eldritch Aeons' -WhatIf
```

After reviewing it, close the game and run the same command without `-WhatIf`. Type `CLOSED` when requested. The installer checks payload hashes and backs up touched files; it does not back up saves or change permanent PowerShell policy. Its original build-time validation did not include execution on Windows. Manual copying remains available.

The installer named above changes **Minecraft files**. It is unrelated to the repository-publishing launcher supplied alongside the repository preparation bundle.

## First use

Check the Thaumonomicon and `/ea_arcane_syntax_status`. Learn components, then inscribe a focus in the Focal Manipulator. **Leave the focus in the device until inscription finishes**; starting the operation is not the same as having a completed spell on the item.

Use a charged native wand. Keep a completed focus in ordinary inventory for the first selection test. Native and Syntax parts must be used in separate spells. See [Testing status](TESTING_STATUS.md) for the remaining checks and unresolved input report.

## Rollback

Restore the matching addon, scripts, configuration and world backup with the game closed. Reverting to Thaumaturge 1.0.2 also requires its matching companion-mod versions. Do not assume an upgraded save is safe to downgrade merely because an older JAR loads.
