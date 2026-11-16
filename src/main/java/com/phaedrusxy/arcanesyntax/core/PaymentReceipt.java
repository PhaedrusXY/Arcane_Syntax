package com.phaedrusxy.arcanesyntax.core;

import java.util.*;

/** Refunds only this attempt's actual debit, rather than restoring an old inventory snapshot. */
public final class PaymentReceipt<K> {
    private final Map<K, Integer> debit;
    private boolean refunded;
    private PaymentReceipt(Map<K, Integer> debit) { this.debit = Map.copyOf(debit); }
    public static <K> PaymentReceipt<K> between(Map<K, Integer> before, Map<K, Integer> after) {
        Map<K, Integer> paid = new LinkedHashMap<>();
        before.forEach((k, amount) -> {
            int delta = amount - after.getOrDefault(k, 0);
            if (delta > 0) paid.put(k, delta);
        });
        return new PaymentReceipt<>(paid);
    }
    public Map<K, Integer> refundInto(Map<K, Integer> current) {
        if (refunded) throw new IllegalStateException("Payment was already refunded.");
        Map<K, Integer> result = new LinkedHashMap<>(current);
        debit.forEach((k, amount) -> result.put(k, Math.addExact(result.getOrDefault(k, 0), amount)));
        refunded = true;
        return Map.copyOf(result);
    }
    public Map<K, Integer> debited() { return debit; }
}
