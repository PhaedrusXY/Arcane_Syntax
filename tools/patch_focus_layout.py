#!/usr/bin/env python3
"""Package Arcane Syntax 0.2.2 from the validated experimental 0.2.1 base.

Only research layout data and version-identifying metadata are updated.
No gameplay code is rebuilt. Verify unchanged entries by decompressed bytes.
"""
import hashlib
import json
import re
from pathlib import Path
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "deployment/0.2.1/mods/arcane_syntax_unified-0.2.1-thaumaturge-1.1.0-test.jar"
OUT = ROOT / "dist/0.2.2/arcane_syntax_unified-0.2.2.jar"
SOURCE = ROOT / "src/main/resources/data/thaumaturge/thaumaturge/research_entry"
TARGET = "data/thaumaturge/thaumaturge/research_entry/"
MOD_METADATA = "META-INF/neoforge.mods.toml"
MANIFEST = "META-INF/MANIFEST.MF"
STARTUP_CLASS = "com/phaedrusxy/arcanesyntax/ArcaneSyntaxUnified.class"
RESEARCH = {
    TARGET + "focus_advanced.json": (SOURCE / "focus_advanced.json", (2, -4)),
    TARGET + "focus_greater.json": (SOURCE / "focus_greater.json", (4, -3)),
}
ALLOWED_CHANGES = set(RESEARCH) | {MOD_METADATA, MANIFEST, STARTUP_CLASS}

assert BASE.is_file(), f"Missing 0.2.1 test build: {BASE}"
OUT.parent.mkdir(parents=True, exist_ok=True)
assert b'version="0.2.2"' in (ROOT / "src/main/resources/META-INF/neoforge.mods.toml").read_bytes()

with ZipFile(BASE) as old, ZipFile(OUT, "w") as patched:
    names = old.namelist()
    assert len(names) == len(set(names)), "Duplicate ZIP entry paths in base JAR"
    assert set(RESEARCH) | {MOD_METADATA, STARTUP_CLASS} <= set(names), "Base JAR missing expected entries"
    for entry in old.infolist():
        data = old.read(entry.filename)
        if entry.filename in RESEARCH:
            source, (col, row) = RESEARCH[entry.filename]
            corrected = json.loads(source.read_text(encoding="utf-8"))
            previous = json.loads(data)
            assert (corrected["column"], corrected["row"]) == (col, row)
            # The only change to research data is its position in the Thaumonomicon.
            for document in (previous, corrected):
                document.pop("column", None)
                document.pop("row", None)
            assert previous == corrected, f"Unintended recipe/dependency change: {entry.filename}"
            data = source.read_bytes()
        elif entry.filename == MOD_METADATA:
            assert data.count(b'version="0.2.1"') == 1, "Unexpected previous mod version"
            data = data.replace(b'version="0.2.1"', b'version="0.2.2"', 1)
        elif entry.filename == MANIFEST:
            # Existing manifests may contain an older offline-build implementation version.
            data, count = re.subn(rb'(?m)^Implementation-Version: [^\r\n]+',
                                  b'Implementation-Version: 0.2.2', data)
            assert count <= 1, "Unexpected duplicate Implementation-Version entries"
        elif entry.filename == STARTUP_CLASS:
            # Only adjust the log-banner string constant (same byte length); no bytecode change.
            data = re.sub(rb'Arcane Syntax 0\.2\.[01]', b'Arcane Syntax 0.2.2', data)
        patched.writestr(entry, data)

with ZipFile(BASE) as old, ZipFile(OUT) as patched:
    assert old.namelist() == patched.namelist(), "Entry set or order changed"
    changed = [name for name in old.namelist() if old.read(name) != patched.read(name)]
    assert set(changed) <= ALLOWED_CHANGES, f"Unexpected changes: {changed}"
    assert set(RESEARCH).issubset(changed), "Expected both research entries to change"
    assert MOD_METADATA in changed, "Expected internal version metadata to change"
    assert b'version="0.2.2"' in patched.read(MOD_METADATA)
    assert b'version="0.2.1"' not in patched.read(MOD_METADATA)
    if MANIFEST in patched.namelist():
        manifest = patched.read(MANIFEST)
        if b'Implementation-Version:' in manifest:
            assert b'Implementation-Version: 0.2.2' in manifest
    for name in RESEARCH:
        payload = json.loads(patched.read(name))
        assert (payload["column"], payload["row"]) == RESEARCH[name][1]
    for name in old.namelist():
        if name.endswith(".class") and name != STARTUP_CLASS:
            assert old.read(name) == patched.read(name), f"Class changed: {name}"
    print("Modified entries:", changed)
    print("Only two research coordinates and version-identifying metadata changed.")
    print("Spell logic, recipes, dependencies and other compiled classes unchanged.")
print("JAR:", OUT)
print("SHA256:", hashlib.sha256(OUT.read_bytes()).hexdigest())
