const fs=require('fs'),vm=require('vm'),ROOT=process.argv[2]||__dirname;
const els=new Map();
function el(id=''){if(!els.has(id))els.set(id,{id,textContent:'',innerHTML:'',value:'',checked:false,className:'',classList:{add(){},remove(){},toggle(){}},style:{},dataset:{},addEventListener(){},querySelectorAll(){return[]},files:[]});return els.get(id)}
const document={getElementById:el,querySelectorAll(sel){return sel==='[data-weekday]'?Array.from({length:7},()=>el('wd')):[]},querySelector(){return null},addEventListener(){},body:{dataset:{},classList:{add(){},remove(){}}}};
const localStorage={m:new Map(),getItem(k){return this.m.get(k)||null},setItem(k,v){this.m.set(k,String(v))},removeItem(k){this.m.delete(k)}};
const context={console,window:{},document,localStorage,navigator:{onLine:true},location:{protocol:'file:',search:''},URLSearchParams,Intl,Date,Math,setTimeout,clearTimeout,fetch:async()=>({ok:false}),alert(){},confirm(){return true},scrollTo(){},Blob,FileReader:class{},caches:{open:async()=>({add:async()=>{}})}};
context.window=context; vm.createContext(context);
for(const f of ['data.js','source_grounded.js','offline_db.js','sync_manager.js','app.js'])vm.runInContext(fs.readFileSync(ROOT+'/'+f,'utf8'),context);
const run=(expr)=>vm.runInContext(expr,context);
run(`renderBriefing();visualScenario();flightScenario();invaQuestion();renderSources();atcScenario();emergencyScenario()`);
const results={
 raw:run('RAW_DB.length'),dedup:run('DB.length'),sourceQ:run('window.SOURCE_QUESTIONS.length'),met1Source:run("window.SOURCE_QUESTIONS.filter(q=>q.subject==='Meteorologia'&&q.chapter==='1').length"),nav10Source:run("window.SOURCE_QUESTIONS.filter(q=>q.subject==='Navegação'&&q.chapter==='10').length"),
 noChapter0:run("DB.every(q=>String(q.chapter)!=='0')"),nav10Pool:run("pool('NAV','10').length"),met1Pool:run("pool('MET','1').length"),mem50:run("buildSession('NAV','10',50,'memory').length"),val50:run("buildSession('MET','1',50,'validation').length"),pass47:run('47/50*100>=95'),pass48:run('48/50*100>=95'),
 briefingFn:run("typeof buildBriefing==='function'"),visualFn:run("typeof visualScenario==='function'"),flightFn:run("typeof flightScenario==='function'"),invaFn:run("typeof evaluateInva==='function'"),atcFn:run("typeof atcEvaluate==='function'"),emergencyFn:run("typeof emergencyEvaluate==='function'"),schema:run('fresh().schema'),plannerDistinct:run(`(()=>{state.settings.plan={start:new Date().toISOString().slice(0,10),exam:new Date(Date.now()+45*86400000).toISOString().slice(0,10),finalDays:10,hours:2,weekdays:[0,1,2,3,4,5,6]};let a=generatePlan().filter(x=>x.text.includes('Cap.')).slice(0,10).map(x=>x.text);return new Set(a).size>=5})()`),diag:run('diagnosticResults().map(x=>[x.name,x.ok])')
};
console.log(JSON.stringify(results,null,2));
if(results.sourceQ!==40||results.met1Source!==20||results.nav10Source!==20||!results.noChapter0||results.mem50!==50||results.val50!==50||results.pass47||!results.pass48||results.schema!==14||!results.plannerDistinct||results.diag.some(x=>!x[1]))process.exit(1);
