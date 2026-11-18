package com.phaedrusxy.arcanesyntax.client;

import com.leclowndu93150.thaumaturge.api.spell.Spell;
import com.leclowndu93150.thaumaturge.api.spell.SpellNode;
import com.leclowndu93150.thaumaturge.api.spell.part.SpellPart;
import com.leclowndu93150.thaumaturge.client.screen.casters.focal.DraftHost;
import com.leclowndu93150.thaumaturge.client.screen.casters.focal.Selection;
import com.leclowndu93150.thaumaturge.client.screen.casters.focal.SpellPaths;
import com.phaedrusxy.arcanesyntax.bridge.SyntaxBridge;
import com.phaedrusxy.arcanesyntax.core.Catalog;
import net.minecraft.resources.ResourceKey;
import java.util.Optional;

/** Non-mutating preview of the native editor's actual append/insert operation. */
public final class SyntaxPalette {
    private SyntaxPalette() {}

    public static boolean compatiblePlacement(DraftHost host, ResourceKey<SpellPart> key) {
        if (!Catalog.isSyntax(key.identifier().toString())) return true;
        Optional<SpellPart> chosen = host.part(key);
        if (chosen.isEmpty()) return false;

        Spell draft = host.draft();
        Selection selection = host.selection();
        // During a deletion, the screen refreshes before moving its selection to the parent.
        // The subsequent select() refresh will restore the choices for that valid parent.
        if (!SpellPaths.exists(draft.root(), selection.path())) return false;
        SpellNode at = SpellPaths.at(draft.root(), selection.path());
        SpellNode fresh = SpellNode.of(key).withAspect(chosen.get().aspect().selectable()
                ? chosen.get().aspect().defaultAspect() : Optional.empty());

        SpellNode nextRoot;
        int room = host.maxChildren(at) - at.children().size();
        if (selection.ghost() || room > 0) {
            nextRoot = SpellPaths.append(draft.root(), selection.path(), fresh);
        } else if (host.maxChildren(at) > 0
                && chosen.get().behavior().maxChildren() >= at.children().size()) {
            nextRoot = SpellPaths.insertBelow(draft.root(), selection.path(), fresh);
        } else {
            return false;
        }

        // Validate the whole candidate: inserting an effect can rebind modifiers in its suffix.
        // Partial drafts are permitted, so choosing a delivery does not require an effect yet.
        return SyntaxBridge.compatibleDraft(draft.withRoot(nextRoot));
    }
}
