package com.phaedrusxy.arcanesyntax.core;

import java.util.*;

/** Dependency-free executable tests: java -ea ...CoreTests. Does not simulate a game launch. */
public final class CoreTests {
    private static int passed;
    public static void main(String[] args) {
        testCatalog(); testGrammar(); testAllComponents(); testCosts(); testReceipts(); randomizedExpansion(); testTiers(); testCombinations(); testShippedCombos(); testFoundationConstruction();
        System.out.println("PASS: " + passed + " assertions (pure compiler/currency/receipt/tier/composition logic; not a Minecraft runtime test)");
    }
    private static void ok(boolean b, String message) { if (!b) throw new AssertionError(message); passed++; }
    private static void rejects(Runnable action, String message) {
        try { action.run(); throw new AssertionError("Expected rejection: " + message); }
        catch (IllegalArgumentException | IllegalStateException expected) { passed++; }
    }
    private static PlanCompiler.Node n(String path, int count, PlanCompiler.Node... children) {
        return new PlanCompiler.Node(Catalog.NAMESPACE + ":" + path, count, List.of(children));
    }
    private static PlanCompiler.Node root(PlanCompiler.Node... children) { return new PlanCompiler.Node(PlanCompiler.ORIGIN, 1, List.of(children)); }
    private static void testCatalog() {
        ok(Catalog.entries().size() == 76, "76 verified components");
        ok(Catalog.entries().stream().filter(e -> e.kind() == Catalog.Kind.DELIVERY).count() == 7, "7 deliveries");
        ok(Catalog.entries().stream().filter(e -> e.kind() == Catalog.Kind.EFFECT).count() == 47, "47 effects");
        ok(Catalog.entries().stream().filter(e -> e.kind() == Catalog.Kind.MODIFIER).count() == 22, "22 modifiers");
        ok(!Catalog.find(Catalog.NAMESPACE + ":modifier/fill").orElseThrow().stackable(), "Fill is not stackable in supplied jar");
        ok(!Catalog.isSyntax("thaumaturge:break"), "native nodes are distinct");
    }
    private static void testGrammar() {
        var mining = root(n("delivery/cast", 1, n("effect/break",1,n("modifier/increased_area",4))));
        SpellPlan plan = PlanCompiler.compile(mining,32);
        ok(plan.delivery().equals("cast"), "correct delivery");
        ok(plan.apiComponents().equals(List.of("break","increased_area","increased_area","increased_area","increased_area")), "exact area expansion");
        var sequence = root(n("delivery/sight",1,n("effect/damage",1,n("modifier/increased_power",2,n("effect/heal",1,n("modifier/prolonged",1))))));
        ok(PlanCompiler.compile(sequence,32).apiComponents().equals(List.of("damage","increased_power","increased_power","heal","prolonged")), "binding order preserved");
        rejects(() -> PlanCompiler.compile(root(),32), "empty");
        rejects(() -> PlanCompiler.compile(root(n("effect/heal",1)),32), "no delivery");
        rejects(() -> PlanCompiler.compile(root(n("delivery/cast",1)),32), "no effect");
        rejects(() -> PlanCompiler.compile(root(n("delivery/cast",2,n("effect/heal",1))),32), "repeated delivery");
        rejects(() -> PlanCompiler.compile(root(n("delivery/cast",1,n("delivery/self",1,n("effect/heal",1)))),32), "second delivery");
        rejects(() -> PlanCompiler.compile(root(n("delivery/self",1,n("modifier/increased_area",1,n("effect/heal",1)))),32), "leading modifier");
        rejects(() -> PlanCompiler.compile(root(n("delivery/self",1,n("effect/heal",1),n("effect/damage",1))),32), "branch");
        rejects(() -> PlanCompiler.compile(root(n("delivery/self",1,n("effect/heal",1)),n("delivery/cast",1,n("effect/damage",1))),32), "multiple root branches");
        rejects(() -> PlanCompiler.compile(root(n("delivery/self",1,new PlanCompiler.Node("thaumaturge:heal",1,List.of()))),32), "mixed native and Syntax");
        rejects(() -> PlanCompiler.compile(root(n("delivery/self",1,n("effect/made_up",1))),32), "unknown component");
        rejects(() -> PlanCompiler.compile(root(n("delivery/self",1,n("effect/heal",0))),32), "zero stacks");
        rejects(() -> PlanCompiler.compile(root(n("delivery/self",1,n("effect/heal",17))),32), "huge stacks");
        rejects(() -> PlanCompiler.compile(root(n("delivery/self",1,n("effect/heal",1,n("modifier/gentleness",2)))),32), "nonstackable repeated");
        rejects(() -> PlanCompiler.compile(root(n("delivery/self",1,n("effect/heal",1,n("modifier/gentleness",1,n("modifier/gentleness",1))))),32), "nonstackable duplicate nodes");
        rejects(() -> PlanCompiler.compile(mining,4), "expanded budget respected");
        ok(PlanCompiler.compile(mining,5).instructions().size()==5, "exact expanded budget allowed");
        rejects(() -> PlanCompiler.compile(mining,0), "bad max limit");
        PlanCompiler.Node chain=n("effect/heal",1);
        for(int i=0;i<34;i++) chain=n("effect/heal",1,chain);
        PlanCompiler.Node tooDeep=root(n("delivery/self",1,chain));
        rejects(() -> PlanCompiler.compile(tooDeep,100), "bounded depth");
    }
    private static void testAllComponents() {
        for (Catalog.Entry e : Catalog.entries()) {
            String path=e.kind().name().toLowerCase(Locale.ROOT)+"/"+e.id();
            PlanCompiler.Node spell = switch(e.kind()) {
                case DELIVERY -> root(n(path,1,n("effect/damage",1)));
                case EFFECT -> root(n("delivery/self",1,n(path,1)));
                case MODIFIER -> root(n("delivery/cast",1,n("effect/damage",1,n(path,1))));
            };
            ok(PlanCompiler.compile(spell,32)!=null,"accepted catalog entry "+path);
        }
    }
    private static void testCosts() {
        ok(CostMath.vis(100f,.1,.1)==10f,"conversion");
        ok(CostMath.vis(0f,.1,.1)==.1f,"minimum");
        ok(CostMath.centivis(CostMath.vis(100f,.1,.1))==1000,"centivis units");
        rejects(()->CostMath.vis(Float.NaN,.1,.1),"NaN cost");
        rejects(()->CostMath.vis(Float.POSITIVE_INFINITY,.1,.1),"infinite cost");
        rejects(()->CostMath.vis(-1,.1,.1),"negative cost");
        rejects(()->CostMath.vis(10,0,.1),"zero ratio");
        rejects(()->CostMath.vis(10,Double.NaN,.1),"NaN ratio");
        rejects(()->CostMath.vis(10,.1,Double.POSITIVE_INFINITY),"infinite minimum");
        rejects(()->CostMath.vis(Float.MAX_VALUE,100,.1),"overflow");
        rejects(()->CostMath.centivis(-1),"negative charge");
        rejects(()->CostMath.centivis(Float.NaN),"NaN payment");
    }
    private static void testReceipts() {
        Map<String,Integer> before=Map.of("fire",1000,"water",700);
        var receipt=PaymentReceipt.between(before,Map.of("fire",900,"water",650));
        ok(receipt.debited().equals(Map.of("fire",100,"water",50)),"debit measured after discounts");
        var refunded=receipt.refundInto(Map.of("fire",910,"water",650,"air",3));
        ok(refunded.equals(Map.of("fire",1010,"water",700,"air",3)),"refund preserves unrelated charging");
        rejects(()->receipt.refundInto(before),"no double refund");
        ok(PaymentReceipt.between(before,before).debited().isEmpty(),"free/creative has empty receipt");
    }
    private static void randomizedExpansion() {
        Random r=new Random(762610L);
        for(int i=0;i<1000;i++) {
            int a=1+r.nextInt(16), b=1+r.nextInt(16);
            var tree=root(n("delivery/cast",1,n("effect/damage",a,n("modifier/increased_area",b))));
            var plan=PlanCompiler.compile(tree,32);
            ok(plan.instructions().size()==a+b,"random expansion count");
            ok(plan.apiComponents().subList(0,a).stream().allMatch("damage"::equals),"effect order");
            ok(plan.apiComponents().subList(a,a+b).stream().allMatch("increased_area"::equals),"modifier order");
            float raw=r.nextFloat()*10000f;
            ok(CostMath.centivis(CostMath.vis(raw,.1,.1))>=10,"nonnegative bounded currency");
        }
    }

    private static SpellPlan single(Catalog.Entry e) {
        String path=e.kind().name().toLowerCase(Locale.ROOT)+"/"+e.id();
        var tree=switch(e.kind()) {
            case DELIVERY -> root(n(path,1,n("effect/damage",1)));
            case EFFECT -> root(n("delivery/cast",1,n(path,1)));
            case MODIFIER -> root(n("delivery/cast",1,n("effect/damage",1,n(path,1))));
        };
        return PlanCompiler.compile(tree,32);
    }
    private static void testTiers() {
        int[] counts=new int[4];
        for(Catalog.Entry e:Catalog.entries()) {
            int t=TierRules.componentTier(e);
            ok(t>=1 && t<=3,"valid tier: "+e.partId()); counts[t]++;
            SpellPlan plan=single(e);
            ok(TierRules.requiredTier(plan)==t,"required tier: "+e.partId());
            for(int available=0;available<=3;available++) {
                final int rank=available;
                if(rank<t) rejects(()->TierRules.requireTier(plan,rank),"tier restriction");
                else {TierRules.requireTier(plan,rank);ok(true,"tier allowed");}
            }
        }
        ok(counts[1]+counts[2]+counts[3]==76,"all components tiered");
        ok(TierRules.requiredTier(PlanCompiler.compile(root(n("delivery/self",1,n("effect/launch",1,n("effect/levitation",1,n("effect/slow_fall",1))))),32))==3,"flight requires greater focus");
        ok(TierRules.focusName(1).contains("Lesser"),"tier 1 name");
        ok(TierRules.focusName(2).contains("Advanced"),"tier 2 name");
        ok(TierRules.focusName(3).contains("Greater"),"tier 3 name");
    }
    private static void testCombinations() {
        rejects(()->TierRules.validateCombinations(PlanCompiler.compile(root(n("delivery/cast",1,n("effect/break",1,n("modifier/fill",1)))),32)),"Break Fill refused");
        rejects(()->TierRules.validateCombinations(PlanCompiler.compile(root(n("delivery/cast",1,n("effect/break",1,n("effect/conjure",1,n("modifier/fill",1))))),32)),"no placement bypass");
        var area=PlanCompiler.compile(root(n("delivery/cast",1,n("effect/break",1,n("modifier/increased_area",4)))),32);
        TierRules.validateCombinations(area);ok(true,"Break Area retained");
        var fill=PlanCompiler.compile(root(n("delivery/cast",1,n("effect/conjure",1,n("modifier/fill",1)))),32);
        TierRules.validateCombinations(fill);ok(true,"non-Break Fill retained");
    }
    private static void combo(String id, String[] effects, String[] modifiers, int minimum) {
        List<String> parts=new ArrayList<>();
        for(String effect:effects)parts.add("effect/"+effect);
        for(String modifier:modifiers)parts.add("modifier/"+modifier);
        while(parts.size()<minimum)parts.add("modifier/increased_area");
        PlanCompiler.Node last=null;
        for(int i=parts.size()-1;i>=0;i--)last=last==null?n(parts.get(i),1):n(parts.get(i),1,last);
        var plan=PlanCompiler.compile(root(n("delivery/self",1,last)),32);
        TierRules.validateCombinations(plan);
        ok(plan.instructions().size()>=minimum,id+" minimum");
        Set<String> seen=new HashSet<>(); Map<String,Integer> counts=new HashMap<>();
        for(var instruction:plan.instructions()) {
            if(instruction.kind()==Catalog.Kind.EFFECT)seen.add(instruction.id());
            else counts.merge(instruction.id(),1,Integer::sum);
        }
        ok(seen.equals(Set.of(effects)),id+" exact effect set preserved");
        for(String modifier:modifiers)ok(counts.getOrDefault(modifier,0)>=Collections.frequency(Arrays.asList(modifiers),modifier),id+" modifier counts");
    }
    private static void testShippedCombos() {
        combo("black_hole",new String[]{"pull","teleport"},new String[]{"increased_area","increased_area"},4);
        combo("blizzard",new String[]{"freeze","pull"},new String[]{"increased_area","increased_area","duration"},5);
        combo("creative_flight",new String[]{"launch","levitation","slow_fall"},new String[]{},3);
        combo("earthquake",new String[]{"slam","explosion"},new String[]{"increased_area"},3);
        combo("emergency_escape",new String[]{"blink","recall","teleport"},new String[]{},3);
        combo("firestorm",new String[]{"ignite","explosion"},new String[]{"increased_area"},3);
        combo("flood",new String[]{"create_water"},new String[]{"increased_area","chain"},4);
        combo("flood_lava",new String[]{"create_water","ignite"},new String[]{"increased_area","chain"},6);
        combo("fortress",new String[]{"conjure"},new String[]{"increased_area","duration"},2);
        combo("geyser",new String[]{"create_water","launch"},new String[]{"increased_area"},3);
        combo("iron_golem",new String[]{"summon","heal"},new String[]{"increased_power"},3);
        combo("lightning_storm",new String[]{"lightning"},new String[]{"increased_area","duration"},3);
        combo("meteor_strike",new String[]{"launch","explosion","ignite"},new String[]{"increased_power","increased_power"},5);
        combo("sanctuary",new String[]{"heal"},new String[]{"increased_area","duration"},3);
        combo("skeletons",new String[]{"summon","lightning"},new String[]{"increased_power"},3);
        combo("tornado",new String[]{"pull","launch"},new String[]{"increased_area"},4);
        combo("vexes",new String[]{"summon","teleport","damage"},new String[]{},3);
        combo("vindicators",new String[]{"summon","damage"},new String[]{"increased_power","increased_power","increased_area"},4);
        combo("void_rift",new String[]{"teleport"},new String[]{"duration","increased_area"},3);
    }

    private static void testFoundationConstruction() {
        for (String shape : List.of("wall", "floor")) {
            var plan=PlanCompiler.compile(root(n("delivery/cast",1,n("effect/conjure",1,n("modifier/"+shape,1)))),32);
            ok(TierRules.requiredTier(plan)==1,"Conjure + "+shape+" requires Foundation only");
            TierRules.requireTier(plan,1); TierRules.validateCombinations(plan);
            ok(plan.apiComponents().equals(List.of("conjure",shape)),"construction composition preserved");
        }
        var filled=PlanCompiler.compile(root(n("delivery/cast",1,n("effect/conjure",1,n("modifier/fill",1)))),32);
        rejects(()->TierRules.requireTier(filled,1),"Fill remains Structured");
        var enlarged=PlanCompiler.compile(root(n("delivery/cast",1,n("effect/conjure",1,n("modifier/increased_area",1)))),32);
        rejects(()->TierRules.requireTier(enlarged,1),"Increased Area remains Structured");
    }
}
