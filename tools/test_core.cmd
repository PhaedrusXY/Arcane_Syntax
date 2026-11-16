@echo off
setlocal
cd /d "%~dp0.."
if not exist build\core-test mkdir build\core-test
javac --release 21 -d build\core-test src\main\java\com\phaedrusxy\arcanesyntax\core\*.java src\test\java\com\phaedrusxy\arcanesyntax\core\CoreTests.java
if errorlevel 1 exit /b 1
java -ea -cp build\core-test com.phaedrusxy.arcanesyntax.core.CoreTests
