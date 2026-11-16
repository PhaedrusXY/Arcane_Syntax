package com.phaedrusxy.arcanesyntax.core;

import java.util.*;

/** Component identifiers and stackability read from the supplied Build a Spell 1.0.3 binary. */
public final class Catalog {
    public static final String NAMESPACE = "arcane_syntax_unified";
    public enum Kind { DELIVERY, EFFECT, MODIFIER }
    public record Entry(Kind kind, String id, boolean stackable) {
        public String partId() { return NAMESPACE + ":" + kind.name().toLowerCase(Locale.ROOT) + "/" + id; }
    }
    private static final Map<String, Entry> ENTRIES;
    static {
        Map<String, Entry> m = new LinkedHashMap<>();
        add(m, Kind.DELIVERY, "rune", false);
        add(m, Kind.DELIVERY, "sight", false);
        add(m, Kind.DELIVERY, "self", false);
        add(m, Kind.DELIVERY, "cast", false);
        add(m, Kind.DELIVERY, "tracking", false);
        add(m, Kind.DELIVERY, "touch", false);
        add(m, Kind.DELIVERY, "trap", false);
        add(m, Kind.EFFECT, "damage", true);
        add(m, Kind.EFFECT, "ignite", true);
        add(m, Kind.EFFECT, "freeze", true);
        add(m, Kind.EFFECT, "teleport", true);
        add(m, Kind.EFFECT, "pull", true);
        add(m, Kind.EFFECT, "push", true);
        add(m, Kind.EFFECT, "yeet", true);
        add(m, Kind.EFFECT, "reap", true);
        add(m, Kind.EFFECT, "explosion", true);
        add(m, Kind.EFFECT, "heal", true);
        add(m, Kind.EFFECT, "lightning", true);
        add(m, Kind.EFFECT, "poison", true);
        add(m, Kind.EFFECT, "wither", true);
        add(m, Kind.EFFECT, "saturation", true);
        add(m, Kind.EFFECT, "launch", true);
        add(m, Kind.EFFECT, "light", true);
        add(m, Kind.EFFECT, "slam", true);
        add(m, Kind.EFFECT, "levitation", true);
        add(m, Kind.EFFECT, "slow_fall", true);
        add(m, Kind.EFFECT, "break", true);
        add(m, Kind.EFFECT, "invisibility", true);
        add(m, Kind.EFFECT, "speed", true);
        add(m, Kind.EFFECT, "haste", true);
        add(m, Kind.EFFECT, "blink", true);
        add(m, Kind.EFFECT, "swap", true);
        add(m, Kind.EFFECT, "summon", true);
        add(m, Kind.EFFECT, "create_water", true);
        add(m, Kind.EFFECT, "evaporate_water", true);
        add(m, Kind.EFFECT, "mark", true);
        add(m, Kind.EFFECT, "recall", true);
        add(m, Kind.EFFECT, "pickup", true);
        add(m, Kind.EFFECT, "shield", true);
        add(m, Kind.EFFECT, "conjure", true);
        add(m, Kind.EFFECT, "growth", true);
        add(m, Kind.EFFECT, "cleanse", true);
        add(m, Kind.EFFECT, "charm", true);
        add(m, Kind.EFFECT, "blind", true);
        add(m, Kind.EFFECT, "slow", true);
        add(m, Kind.EFFECT, "weaken", true);
        add(m, Kind.EFFECT, "strengthen", true);
        add(m, Kind.EFFECT, "regenerate", true);
        add(m, Kind.EFFECT, "resist", true);
        add(m, Kind.EFFECT, "night_vision", true);
        add(m, Kind.EFFECT, "water_breathing", true);
        add(m, Kind.EFFECT, "root", true);
        add(m, Kind.EFFECT, "grapple", true);
        add(m, Kind.EFFECT, "gust", true);
        add(m, Kind.MODIFIER, "increased_area", true);
        add(m, Kind.MODIFIER, "increased_power", true);
        add(m, Kind.MODIFIER, "nullify", false);
        add(m, Kind.MODIFIER, "gentleness", false);
        add(m, Kind.MODIFIER, "fortunate_son", true);
        add(m, Kind.MODIFIER, "double", true);
        add(m, Kind.MODIFIER, "echo", true);
        add(m, Kind.MODIFIER, "prolonged", true);
        add(m, Kind.MODIFIER, "delay", true);
        add(m, Kind.MODIFIER, "chain", true);
        add(m, Kind.MODIFIER, "pierce", true);
        add(m, Kind.MODIFIER, "bounce", false);
        add(m, Kind.MODIFIER, "accelerate", false);
        add(m, Kind.MODIFIER, "duration", true);
        add(m, Kind.MODIFIER, "linger", false);
        add(m, Kind.MODIFIER, "split", true);
        add(m, Kind.MODIFIER, "wall", false);
        add(m, Kind.MODIFIER, "floor", false);
        add(m, Kind.MODIFIER, "fill", false);
        add(m, Kind.MODIFIER, "leech", true);
        add(m, Kind.MODIFIER, "sunder", true);
        add(m, Kind.MODIFIER, "return", false);
        ENTRIES = Collections.unmodifiableMap(m);
    }
    private static void add(Map<String, Entry> m, Kind k, String id, boolean stackable) {
        Entry e = new Entry(k, id, stackable);
        if (m.put(e.partId(), e) != null) throw new IllegalStateException("Duplicate component: " + id);
    }
    private Catalog() {}
    public static Optional<Entry> find(String partId) { return Optional.ofNullable(ENTRIES.get(partId)); }
    public static Collection<Entry> entries() { return ENTRIES.values(); }
    public static boolean isSyntax(String partId) { return partId != null && partId.startsWith(NAMESPACE + ":"); }
}
