package com.phaedrusxy.arcanesyntax.core;

import java.util.*;

/** Pure grammar compiler. Never changes player state, resource pools, or focus data. */
public final class PlanCompiler {
    public static final int MAX_STACKS = 16;
    public static final int MAX_NODES = 32;
    public static final String ORIGIN = "thaumaturge:origin";
    public record Node(String partId, int stacks, List<Node> children) {
        public Node { children = List.copyOf(children); }
    }
    public static final class InvalidSpell extends IllegalArgumentException {
        public InvalidSpell(String message) { super(message); }
    }
    private PlanCompiler() {}

    public static SpellPlan compile(Node root, int maxComponents) {
        if (root == null || !ORIGIN.equals(root.partId())) fail("The spell must start at the native origin.");
        if (maxComponents < 1 || maxComponents > 4096) fail("Invalid component limit.");
        if (root.stacks() != 1) fail("The origin cannot be repeated.");
        if (root.children().size() != 1) fail("Arcane Syntax requires one continuous chain, not branches.");
        Node node = root.children().get(0);
        Catalog.Entry first = Catalog.find(node.partId()).orElseThrow(() -> new InvalidSpell("Start with an Arcane Syntax delivery."));
        if (first.kind() != Catalog.Kind.DELIVERY || node.stacks() != 1) fail("Start with exactly one delivery.");
        String delivery = first.id();
        List<SpellPlan.Instruction> out = new ArrayList<>();
        Set<String> nonStackable = new HashSet<>();
        Set<Node> visited = Collections.newSetFromMap(new IdentityHashMap<>());
        int nodes = 0;
        boolean seenEffect = false;
        while (true) {
            if (!visited.add(node) || ++nodes > MAX_NODES) fail("Spell chain is too deep or cyclic.");
            String partId = node.partId();
            Catalog.Entry entry = Catalog.find(partId).orElseThrow(() -> new InvalidSpell(
                    "Unknown or mixed native/Arcane Syntax component: " + partId));
            if (node.stacks() < 1 || node.stacks() > MAX_STACKS) fail("Stack count is outside 1-16.");
            if (!entry.stackable() && node.stacks() != 1) fail(entry.id() + " does not stack.");
            if (nodes > 1) {
                if (entry.kind() == Catalog.Kind.DELIVERY) fail("Only the first node may be a delivery.");
                if (entry.kind() == Catalog.Kind.EFFECT) seenEffect = true;
                // Require unambiguous placement. The BaS engine still decides modifier applicability.
                if (entry.kind() == Catalog.Kind.MODIFIER && !seenEffect) fail("Place modifiers after an effect.");
                if (entry.kind() == Catalog.Kind.MODIFIER && !entry.stackable() && !nonStackable.add(entry.id()))
                    fail("Non-stackable modifier appears twice: " + entry.id());
                if ((long) out.size() + node.stacks() > maxComponents) fail("The expanded spell exceeds Build a Spell's component limit.");
                for (int n = 0; n < node.stacks(); n++) out.add(new SpellPlan.Instruction(entry.kind(), entry.id()));
            }
            if (node.children().isEmpty()) break;
            if (node.children().size() != 1) fail("Arcane Syntax branches are not supported; use BaS modifiers instead.");
            node = node.children().get(0);
        }
        if (!seenEffect) fail("Add at least one effect.");
        return new SpellPlan(delivery, out);
    }
    private static void fail(String message) { throw new InvalidSpell(message); }
}
