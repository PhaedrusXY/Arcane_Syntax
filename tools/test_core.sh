#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p build/core-test
javac --release 21 -d build/core-test src/main/java/com/phaedrusxy/arcanesyntax/core/*.java src/test/java/com/phaedrusxy/arcanesyntax/core/CoreTests.java
java -ea -cp build/core-test com.phaedrusxy.arcanesyntax.core.CoreTests
