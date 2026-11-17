#!/usr/bin/env python3
"""Repackage the existing 0.2.1 test JAR with exactly two corrected research layouts.

No compilation is performed. Assert that every other JAR payload is unchanged.
"""
import hashlib
import json
from pathlib import Path
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "deployment/0.2.1/mods/arcane_syntax_unified-0.2.1-thaumaturge-1.1.0-test.jar"
OUT = ROOT / "dist/0.2.1/arcane_syntax_unified-0.2.1-auromancy-layout-fix.jar"
SOURCE = ROOT / "src/main/resources/data/thaumaturge/thaumaturge/research_entry"
TARGET = "data/thaumaturge/thaumaturge/research_entry/"
CHANGES = {
    TARGET + "focus_advanced.json": (SOURCE / "focus_advanced.json", (2, -4)),
    TARGET + "focus_greater.json": (SOURCE / "focus_greater.json", (4, -3)),
}

assert BASE.is_file(), f"Missing original artifact: {BASE}"
OUT.parent.mkdir(parents=True, exist_ok=True)

with ZipFile(BASE) as old, ZipFile(OUT, "w") as patched:
    names = old.namelist()
    assert len(names) == len(set(names)), "Duplicate ZIP entry paths"
    assert set(CHANGES).issubset(names), "Original artifact lacks one or both research entries"
    for item in old.infolist():
        original = old.read(item.filename)
        new_data = original
        if item.filename in CHANGES:
            source, (col, row) = CHANGES[item.filename]
            corrected = json.loads(source.read_text(encoding="utf-8"))
            previous = json.loads(original)
            assert (corrected["column"], corrected["row"]) == (col, row)
            # Only the position is allowed to differ. Prerequisites, recipes, etc. must match.
            for obj in (previous, corrected):
                obj.pop("column", None)
                obj.pop("row", None)
            assert previous == corrected, f"Unexpected non-layout change: {item.filename}"
            new_data = source.read_bytes()
        patched.writestr(item, new_data)

with ZipFile(BASE) as old, ZipFile(OUT) as patched:
    assert old.namelist() == patched.namelist()
    changed = []
    for name in old.namelist():
        if old.read(name) != patched.read(name):
            changed.append(name)
    assert set(changed).issubset(CHANGES), f"Unexpected changes: {changed}"
    for name in CHANGES:
        payload = json.loads(patched.read(name))
        assert (payload["column"], payload["row"]) == CHANGES[name][1]
    print("Changed entries:", changed)
    print("All other JAR entry contents unchanged; compiled .class files byte-identical.")
print("JAR:", OUT)
print("SHA256:", hashlib.sha256(OUT.read_bytes()).hexdigest())
