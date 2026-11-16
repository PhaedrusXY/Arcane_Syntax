#!/usr/bin/env python3
"""Reproduce the experimental binary port. NOT a substitute for a NeoForge build.
Requires Python 3.10+, JDK 21+, this source tree and the exact prior 0.2.0 JAR.
No dependencies are downloaded and no installed Minecraft instance is changed.
"""
import argparse
import hashlib
from pathlib import Path
import subprocess
import sys
import tempfile
import zipfile
from classfile import rewrite_utf, references, read_pool

BASE_SHA256 = '74c3194d8f95b1b2662c0bf647da7dfaad82ca37f4333e64e719a08d9eea1ba1'
NAMES = {'getAllVis':'chargeOf', 'setAllVis':'writeCharge', 'consumeAllVis':'payCosts',
         'getConsumptionModifier':'costFactor', 'getVis':'storedIn'}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-jar', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    source = Path(__file__).resolve().parents[1]
    if hashlib.sha256(args.base_jar.read_bytes()).hexdigest() != BASE_SHA256:
        raise SystemExit('Base JAR does not match the exact prior 0.2.0 candidate; refusing to patch.')
    if args.output.resolve() == args.base_jar.resolve():
        raise SystemExit('Output must not overwrite the base JAR.')
    with zipfile.ZipFile(args.base_jar) as z:
        entries = {n: z.read(n) for n in z.namelist() if not n.endswith('/')}
    bridge = 'com/phaedrusxy/arcanesyntax/bridge/SyntaxBridge.class'
    before = entries[bridge]
    entries[bridge], counts = rewrite_utf(before, NAMES)
    assert set(counts) == set(NAMES)
    removed = set(references(before)) - set(references(entries[bridge]))
    added = set(references(entries[bridge])) - set(references(before))
    assert len(removed) == len(added) == 5
    for tag, owner, name, desc in removed:
        assert owner == 'com/leclowndu93150/thaumaturge/content/wands/WandVisHelper'
        assert (tag, owner, NAMES[name], desc) in added
    assert before[read_pool(before)[1]:] == entries[bridge][read_pool(entries[bridge])[1]:]
    mainclass = 'com/phaedrusxy/arcanesyntax/ArcaneSyntaxUnified.class'
    entries[mainclass], count = rewrite_utf(entries[mainclass], {
        'Arcane Syntax Unified 0.2.0 focus migration: native focus bridge for Thaumaturge 1.0.2 / Build a Spell 1.0.3':
        'Arcane Syntax Unified 0.2.1 compatibility test: native focus bridge for Thaumaturge 1.1.0 / Build a Spell 1.0.3'})
    assert count
    with tempfile.TemporaryDirectory(prefix='asu-core-') as temporary:
        compiled = Path(temporary)
        javafiles = sorted((source / 'src/main/java/com/phaedrusxy/arcanesyntax/core').glob('*.java'))
        test = source / 'src/test/java/com/phaedrusxy/arcanesyntax/core/CoreTests.java'
        subprocess.run(['javac','--release','21','-d',str(compiled), *map(str, javafiles),str(test)],check=True)
        subprocess.run(['java','-ea','-cp',str(compiled),'com.phaedrusxy.arcanesyntax.core.CoreTests'],check=True)
        for p in compiled.rglob('*.class'):
            if not p.name.startswith('CoreTests'):
                entries[p.relative_to(compiled).as_posix()] = p.read_bytes()
    resources = source / 'src/main/resources'
    for p in resources.rglob('*'):
        if p.is_file(): entries[p.relative_to(resources).as_posix()] = p.read_bytes()
    entries['META-INF/MANIFEST.MF'] = (
        'Manifest-Version: 1.0\r\nImplementation-Title: Arcane Syntax Unified Casting\r\n'
        'Implementation-Version: 0.2.1\r\nImplementation-Vendor: PhaedrusXY\r\n'
        'Build-Verification: Experimental offline compatibility port\r\n'
        'Target-Thaumaturge: 1.1.0\r\n\r\n').encode()
    assert not any('CoreTests' in n or n.endswith('.nbt') for n in entries)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(args.output,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
        for name,data in sorted(entries.items()):
            info = zipfile.ZipInfo(name, date_time=(2026,11,14,0,0,0))
            info.compress_type = zipfile.ZIP_DEFLATED
            z.writestr(info, data, compresslevel=9)
    with zipfile.ZipFile(args.output) as z: assert z.testzip() is None
    print('Wrote experimental offline candidate:', args.output)
    print('SHA256:', hashlib.sha256(args.output.read_bytes()).hexdigest())
    print('Full NeoForge compilation, released dependency linkage and Minecraft runtime remain untested.')

if __name__ == '__main__':
    main()
