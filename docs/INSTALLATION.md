# Installation and migration

## Current release: 1.2

Download [`arcane_syntax_unified-1.2.jar`](https://github.com/PhaedrusXY/Arcane_Syntax/releases/download/v1.2/arcane_syntax_unified-1.2.jar) from the [GitHub 1.2 release](https://github.com/PhaedrusXY/Arcane_Syntax/releases/tag/v1.2). The **filename, NeoForge mod version and manifest identify the same release: 1.2**. The previous CurseForge upload was numbered 1.1.0. Historical GitHub 0.2.x test builds, including the 0.2.2 corrected candidate, are superseded.

**Replacing the addon JAR in an already migrated test instance:** Close Minecraft and replace the older Arcane Syntax JAR in `mods/`; do not retain a second version. For multiplayer, install the identical JAR on both client and server. Do not simply rename the 0.2.2 JAR to 1.2—its embedded mod version would still say 0.2.2.

**Migrating from an older Eldritch Aeons pack:** Use the current pack's complete KubeJS scripts and matched Thaumaturge/KubeThaum dependencies. Simply swapping the addon JAR does **not** supply the required recipes, research, or learning scripts. The safest approach for an existing save is a fresh CurseForge 2.0 profile followed by moving a backed-up world into it. For in-place upgrades, back up and replace obsolete KubeJS scripts, and remove the exact old Outer Lands templates listed in [REMOVE_OLD_PORTAL_PATCHES.txt](../deployment/0.2.1/REMOVE_OLD_PORTAL_PATCHES.txt). Keep unrelated datapack files and customized settings.

**Validation:** Version 1.2 retains the corrected research coordinates, Advanced Foci (2, -4) and Greater Foci (4, -3). The distribution is still an experimental compatibility candidate, not a verified new NeoForge compilation. No world reset is required for this visual correction; perform the initial in-game check with backups.

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
