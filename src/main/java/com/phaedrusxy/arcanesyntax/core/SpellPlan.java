package com.phaedrusxy.arcanesyntax.core;

import java.util.List;

/** Immutable, ordered BaS program. The delivery is not included in the component count. */
public record SpellPlan(String delivery, List<Instruction> instructions) {
    public SpellPlan { instructions = List.copyOf(instructions); }
    public record Instruction(Catalog.Kind kind, String id) {}
    public List<String> apiComponents() { return instructions.stream().map(Instruction::id).toList(); }
}
