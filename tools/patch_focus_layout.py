#!/usr/bin/env python3
"""Package Arcane Syntax 1.2 from the preserved 0.2.1 compatibility test baseline.

This is a resource and version-metadata update, NOT a dependency-resolved rebuild.
The two research coordinates are corrected; all spell logic and prerequisites are unchanged.
The historical input JAR remains under deployment/0.2.1 for reproducibility.
"""
import hashlib
import difflib
import json
import re
from pathlib import Path
from zipfile import ZipFile
from classfile import read_pool, rewrite_utf

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "deployment/0.2.1/mods/arcane_syntax_unified-0.2.1-thaumaturge-1.1.0-test.jar"
OUT = ROOT / "dist/1.2/arcane_syntax_unified-1.2.jar"
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

assert BASE.is_file(), f"Missing preserved 0.2.1 input JAR: {BASE}"
OUT.parent.mkdir(parents=True, exist_ok=True)
new_mod_metadata = (ROOT / "src/main/resources/META-INF/neoforge.mods.toml").read_bytes()
assert new_mod_metadata.count(b'version="1.2"') == 1, "Incorrect internal mod version"

with ZipFile(BASE) as old, ZipFile(OUT, "w") as patched:
    names = old.namelist()
    assert len(names) == len(set(names)), "Duplicate input JAR entries"
    assert set(RESEARCH) | {MOD_METADATA, STARTUP_CLASS, MANIFEST} <= set(names), "Input JAR missing expected entries"
    for entry in old.infolist():
        data = old.read(entry.filename)
        if entry.filename in RESEARCH:
            source, (col, row) = RESEARCH[entry.filename]
            corrected = json.loads(source.read_text(encoding="utf-8"))
            previous = json.loads(data)
            assert (corrected["column"], corrected["row"]) == (col, row)
            for document in (previous, corrected):
                document.pop("column", None)
                document.pop("row", None)
            assert previous == corrected, f"Non-layout research changes: {entry.filename}"
            data = source.read_bytes()
        elif entry.filename == MOD_METADATA:
            assert data.count(b'version="0.2.1"') == 1, "Unexpected baseline version"
            expected = data.replace(b'version="0.2.1"', b'version="1.2"', 1)
            if expected != new_mod_metadata:
                print("Original JAR metadata vs current source metadata:")
                print("".join(difflib.unified_diff(
                    expected.decode("utf-8").splitlines(keepends=True),
                    new_mod_metadata.decode("utf-8").splitlines(keepends=True),
                    fromfile="baseline-with-1.2", tofile="source-1.2")))
                raise AssertionError("Mod metadata differences extend beyond version number")
            data = new_mod_metadata
        elif entry.filename == MANIFEST:
            data, count = re.subn(rb'(?m)^Implementation-Version: [^\r\n]+',
                                  b'Implementation-Version: 1.2', data)
            assert count == 1, "Missing or duplicate manifest implementation version"
        elif entry.filename == STARTUP_CLASS:
            # Alter only the UTF8 version banner in the constant pool. The bytecode is untouched.
            pool, before_end = read_pool(data)
            old_banners = [
                val.decode("utf-8")
                for el in pool[1:] if el is not None
                for tag, val in [el]
                if tag == 1 and b"Arcane Syntax" in val and b"native focus bridge" in val
            ]
            assert len(old_banners) <= 1, f"Unexpected startup banners: {old_banners}"
            if old_banners:
                newer = ("Arcane Syntax 1.2 compatibility test: native focus bridge "
                         "for Thaumaturge 1.1.0 / Build a Spell 1.0.3")
                data, counts = rewrite_utf(data, {old_banners[0]: newer})
                assert counts.get(old_banners[0]) == 1
                assert old.read(entry.filename)[before_end:] == data[read_pool(data)[1]:], (
                    "Compiled instructions changed while patching the banner")
            else:
                print("Note: no startup version banner in classfile; no class patch needed.")
        patched.writestr(entry, data)

with ZipFile(BASE) as old, ZipFile(OUT) as patched:
    assert old.namelist() == patched.namelist(), "Unexpected added/removed entries"
    assert patched.testzip() is None
    changed = [name for name in old.namelist() if old.read(name) != patched.read(name)]
    assert set(changed) <= ALLOWED_CHANGES, f"Unexpected changes: {changed}"
    assert set(RESEARCH) | {MOD_METADATA, MANIFEST} <= set(changed), "Required changes missing"
    assert patched.read(MOD_METADATA) == new_mod_metadata
    assert b'Implementation-Version: 1.2' in patched.read(MANIFEST)
    for name in RESEARCH:
        resource = json.loads(patched.read(name))
        assert (resource["column"], resource["row"]) == RESEARCH[name][1]
    for name in old.namelist():
        if name.endswith(".class") and name != STARTUP_CLASS:
            assert old.read(name) == patched.read(name), f"Gameplay class modified: {name}"
    print("Modified entries:", changed)
    print("Research prerequisites, crafting recipes, spell logic and other classes are identical.")
print("JAR:", OUT)
print("SHA256:", hashlib.sha256(OUT.read_bytes()).hexdigest())
