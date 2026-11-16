#!/usr/bin/env node
// Runs the actual packaged JavaScript against API-shaped mocks. Not a game/runtime test.
'use strict';
const assert=require('node:assert/strict'), fs=require('node:fs'), path=require('node:path'), vm=require('node:vm');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../pack/kubejs'));
const fixtures=path.join(__dirname,'../src/test/fixtures');
let checks=0; const ok=(condition,msg)=>{assert.ok(condition,msg);checks++;};
const equal=(actual,expected,msg)=>{assert.deepEqual(JSON.parse(JSON.stringify(actual)),JSON.parse(JSON.stringify(expected)),msg);checks++;};
const code=(rel)=>fs.readFileSync(path.join(root,rel),'utf8');
function chainProxy(callback) {let p=new Proxy({}, {get(t,k){return(...args)=>{if(callback)callback(k,args);return p;};}});return p;}
const registry=[]; const global={};
const base={global,console:{info(){},warn(){}},StartupEvents:{registry(type,fn){fn({create(id){registry.push(id);return chainProxy();}});}}};
vm.runInNewContext(code('startup_scripts/00_eldritch_aeons_arcane_syntax_items.js'),base);
const components=global.EA_ARCANE_SYNTAX_COMPONENTS;
equal(components.length,75,'75 rune definitions');equal(registry.length,76,'75 runes + saved legacy item');
const original=JSON.parse(fs.readFileSync(path.join(fixtures,'runes_before_migration.json'),'utf8'));
for(const c of components){let old=original.find(x=>x.item===c.item);ok(!!old,'unchanged rune identity');
 for(const key of ['kind','id','tier','method','recipe','recipe_id','research']) {
  let expected=old[key];
  if(c.id==='conjure' && c.kind==='effect') {
    if(key==='tier') expected=1;
    if(key==='research') expected='kubejs:lexical_foundations';
  }
  equal(c[key],expected,`preserved or explicitly migrated ${c.id} ${key}`);
 }
}
// Event and player-state mocks mirror the methods actually used by these scripts.
const inventoryEvents=new Map(),clickEvents=new Map(),logins=[],commands=new Map();
class NativeWand {getFocusStack(stack){return stack.socket||empty();}}
const dummyItem={}; const empty=()=>({id:'minecraft:air',isEmpty:()=>true,getItem:()=>dummyItem});
const stack=(id,socket)=>({id,socket,count:1,isEmpty(){return this.count<1;},getItem(){return id==='thaumaturge:wand'?new NativeWand():dummyItem;},shrink(n){this.count-=n;}});
const attachment={get:()=> 'spells'};
function player(){const persist=new Map(), unlocked={delivery:new Set(),effect:new Set(),modifier:new Set()};
 const data={isStarterKitGranted(){return !!this.starter;},isGuidebookGranted(){return !!this.guide;},markStarterKitGranted(){this.starter=true;},markGuidebookGranted(){this.guide=true;}};
 for(const [kind,cap] of [['delivery','Delivery'],['effect','Effect'],['modifier','Modifier']]){
   data[`is${cap}Unlocked`]=id=>unlocked[kind].has(id);data[`unlock${cap}`]=id=>unlocked[kind].add(id);
 }
 for(const [name,kind] of [['DeliveryMethods','delivery'],['Effects','effect'],['Modifiers','modifier']])data[`getUnlocked${name}`]=()=>({size:()=>unlocked[kind].size});
 const p={inventory:[],offhand:empty(),messages:[],issued:[],data,unlocked,persist,sync:0,
  persistentData:{getIntOr:(k,d)=>persist.has(k)?persist.get(k):d,getBooleanOr:(k,d)=>persist.has(k)?persist.get(k):d,putInt:(k,v)=>persist.set(k,v),putBoolean:(k,v)=>persist.set(k,v)},
  getData:()=>data,syncData(){this.sync++;},tell(m){this.messages.push(m);},getName:()=>({getString:()=> 'TestPlayer'}),getOffhandItem(){return this.offhand;},
  getInventory(){const that=this;return {getContainerSize:()=>that.inventory.length,getItem:i=>that.inventory[i]};}};
 p.server={runCommandSilent:c=>p.issued.push(c)};return p;}
const runtime={global,console:base.console,Java:{loadClass(name){if(name.endsWith('ModAttachments'))return {PLAYER_SPELL_DATA:attachment};if(name.endsWith('ItemWand'))return NativeWand;return {fromId:id=>id};}},
 PlayerEvents:{inventoryChanged(id,fn){inventoryEvents.set(id,fn);},loggedIn(fn){logins.push(fn);}},
 ItemEvents:{rightClicked(id,fn){clickEvents.set(id,fn);}},ServerEvents:{basicCommand(name,fn){commands.set(name,fn);}}};
vm.runInNewContext(code('server_scripts/eldritch_aeons_arcane_syntax.js'),runtime);
function login(p){logins.forEach(fn=>fn({player:p}));}
function learn(p,c){const item=stack(c.item),e={player:p,item,cancel(){this.cancelled=true;}};clickEvents.get(c.item)(e);return e;}
const p=player();login(p);ok(p.data.starter && p.data.guide,'stock initial progression marked handled');
ok(p.unlocked.delivery.size===0 && p.issued.length===0,'fresh player receives no free component');
p.inventory=[stack('buildaspell:runic_wand')];login(p);ok(p.unlocked.delivery.size===0,'old physical wand does not unlock tier');
p.inventory=[stack('thaumaturge:focus_1')];inventoryEvents.get('thaumaturge:focus_1')({player:p});
ok(p.unlocked.delivery.has('cast'),'Lesser grants Cast');equal(p.persist.get('ea_arcane_syntax_tier'),1,'Lesser tier');
equal(p.issued.filter(s=>s.startsWith('give ')).length,1,'starter blanks exactly once');login(p);equal(p.issued.filter(s=>s.startsWith('give ')).length,1,'no repeated starter grants');
for(const c of components.filter(x=>x.tier>1)){const e=learn(p,c);ok(e.item.count===1 && !p.unlocked[c.kind].has(c.id),'reject higher-tier rune without consumption');}
for(const c of components.filter(x=>x.tier===1)){const e=learn(p,c);ok(e.item.count===0 && p.unlocked[c.kind].has(c.id),'learn Foundation rune');ok(learn(p,c).item.count===1,'duplicate knowledge preserves item');}
p.inventory=[stack('thaumaturge:focus_2')];inventoryEvents.get('thaumaturge:focus_2')({player:p});
equal(p.persist.get('ea_arcane_syntax_tier'),2,'Advanced tier');
for(const c of components.filter(x=>x.tier===2)){ok(learn(p,c).item.count===0 && p.unlocked[c.kind].has(c.id),'learn Structured rune');}
p.inventory=[stack('thaumaturge:wand',stack('thaumaturge:focus_3'))];login(p);equal(p.persist.get('ea_arcane_syntax_tier'),3,'socketed Greater tier at login');
for(const c of components.filter(x=>x.tier===3)){ok(learn(p,c).item.count===0 && p.unlocked[c.kind].has(c.id),'learn Infused rune');}
equal([...p.unlocked.delivery,...p.unlocked.effect,...p.unlocked.modifier].length,76,'all 76 learnable with no legacy wands');
p.inventory=[];login(p);equal(p.persist.get('ea_arcane_syntax_tier'),3,'earned learning milestone persists without equipment');
const previousSync=p.sync;login(p);equal(p.sync,previousSync,'unchanged inventory/login does not re-sync knowledge');
const saved=player();saved.persist.set('ea_arcane_syntax_runic',true);saved.unlocked.effect.add('teleport');login(saved);equal(saved.persist.get('ea_arcane_syntax_tier'),3,'old saved milestone retained');ok(saved.unlocked.effect.has('teleport'),'old knowledge not erased');
const legacy=player();legacy.inventory=[stack('kubejs:eldritch_syntax_key')];login(legacy);equal(legacy.persist.get('ea_arcane_syntax_tier'),0,'old key does not advance new character');
ok(!commands.has('ea_arcane_syntax_migrate'),'no destructive reset command');
const captured=[],removed=[];
function recipe(type,args){const record={type,args};captured.push(record);return chainProxy((name,x)=>record[name]=x[0]);}
const events={remove:x=>removed.push(x),shapeless:(...x)=>recipe('minecraft:crafting_shapeless',x),shaped:(...x)=>recipe('minecraft:crafting_shaped',x),custom:x=>recipe(x.type,[x]),recipes:{thaumaturge:{arcane_workbench_shapeless:(...x)=>recipe('thaumaturge:arcane_workbench_shapeless',x),infusion:(...x)=>recipe('thaumaturge:infusion',x)},occultism:{ritual:(...x)=>recipe('occultism:ritual',x)}}};
vm.runInNewContext(code('server_scripts/eldritch_aeons_arcane_syntax_recipes.js'),{global,ServerEvents:{recipes:fn=>fn(events)}});
for(const c of components){const r=captured.find(r=>r.id===c.recipe_id);ok(!!r,'every rune has recipe');if(c.method!=='ritual')equal(r.research,c.research,'recipe research matches unchanged rune');}
const f2=captured.find(r=>r.args[0]==='thaumaturge:focus_2'),f3=captured.find(r=>r.args[0]==='thaumaturge:focus_3');
equal(f2.type,'thaumaturge:arcane_workbench_shapeless','Advanced retains early arcane recipe');equal(f2.research,'kubejs:names_and_natures','Advanced gate');equal(f3.research,'kubejs:infused_syntax','Greater gate');equal(f3.args[1],'thaumaturge:focus_2','Greater catalyst');
ok(!JSON.stringify(captured).includes('primordial_pearl'),'no pearl introduced in pack recipes');
ok(!captured.some(r=>typeof r.args[0]==='string' && /buildaspell:(worn|carved|runic)_wand/.test(r.args[0])),'no retired output');
for(const id of ['worn','carved','runic'])ok(removed.some(r=>r.output===`buildaspell:${id}_wand`),'old wand recipe output removed');
const entries={};
function researchBuilder(id){const e={id,parents:[],stages:[]};entries[id]=e;return chainProxy((method,args)=>{if(method==='parent')e.parents.push(args[0]);else if(method==='stage'){const stage={};e.stages.push(stage);args[0](chainProxy((m,a)=>{(stage[m]??=[]).push(a);}));}else e[method]=args;});}
const researchEvent={category:()=>chainProxy(),create:researchBuilder};
const shared={global,ThaumaturgeEvents:{research:fn=>fn(researchEvent)},ServerEvents:{recipes:fn=>fn(events)}};
vm.runInNewContext(code('server_scripts/eldritch_aeons_arcane_syntax_research.js'),shared);
vm.runInNewContext(code('server_scripts/eldritch_aeons_draconic_artifice.js'),shared);
for(const e of Object.values(entries)){
 ok(!JSON.stringify(e).match(/buildaspell:(worn|carved|runic)_wand/),'no research gate or reference to retired wand');
 if(e.id!=='kubejs:draconic_metallurgy')equal(e.stages.length,2,'saved stage indices preserved');
}
equal(entries['kubejs:resonant_casting'].stages[0].craft[0][0],'thaumaturge:focus_1','Resonant craft milestone');
equal(entries['kubejs:carved_syntax'].stages[0].craft[0][0],'thaumaturge:focus_2','Structured craft milestone');
equal(entries['kubejs:runic_mastery'].stages[0].craft[0][0],'thaumaturge:focus_3','Infused craft milestone');
equal(entries['kubejs:draconic_metallurgy'].stages[0].obtain[0][0],'thaumaturge:focus_3','downstream Dragonforge gate repaired');
const lang={},hidden=[];
for(const ns of ['kubejs','thaumaturge']) Object.assign(lang,JSON.parse(fs.readFileSync(path.join(__dirname,'../src/main/resources/assets',ns,'lang/en_us.json'),'utf8')));const client={global,ClientEvents:{lang:(l,fn)=>fn({add:(k,v)=>lang[k]=v})},ItemEvents:{modifyTooltips:()=>{}},RecipeViewerEvents:{removeEntries:(type,fn)=>fn({remove:x=>hidden.push(x)})}};
vm.runInNewContext(code('client_scripts/eldritch_aeons_arcane_syntax_lang.js'),client);
vm.runInNewContext(code('client_scripts/eldritch_aeons_draconic_artifice_lang.js'),client);
for(const e of Object.values(entries))for(const stage of e.stages)for(const [key] of stage.text||[])ok(typeof lang[key]==='string','every book page has localization: '+key);

const conjure=components.find(c=>c.kind==='effect' && c.id==='conjure');
equal(conjure.tier,1,'Conjure Foundation learning tier');equal(conjure.research,'kubejs:lexical_foundations','Conjure recipe research Foundation');equal(conjure.tier_name,'Foundation','Conjure tooltip Foundation');
const novice=player();novice.inventory=[stack('thaumaturge:focus_1')];login(novice);ok(learn(novice,conjure).item.count===0,'Lesser Focus can learn Conjure');
ok(learn(novice,conjure).item.count===1,'duplicate Conjure keeps rune');
const basePages=JSON.stringify(entries['kubejs:lexical_foundations']);const advancedPages=JSON.stringify(entries['kubejs:carved_syntax']);
ok(basePages.includes('kubejs:inscribe_effect_conjure'),'Conjure recipe displayed at Foundation');ok(!advancedPages.includes('kubejs:inscribe_effect_conjure'),'Conjure recipe no longer located only in Structured');
ok(entries['kubejs:two_grammars']!==undefined,'Two Grammars preserved');
ok(lang['research.kubejs.runic_mastery.stage.3'].includes('gravity is negotiable'),'polished Runic Mastery preserved');

const complete={entries,recipes:captured,removed,checks};
fs.mkdirSync(path.join(__dirname,'../build'),{recursive:true});fs.writeFileSync(path.join(__dirname,'../build/pack-audit.json'),JSON.stringify(complete,null,2));
console.log(`PASS: ${checks} assertions (real pack scripts with API-shaped mocks; not a KubeJS/Minecraft runtime test)`);
