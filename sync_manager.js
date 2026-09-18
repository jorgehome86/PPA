'use strict';
(function(){
  const DB=()=>window.PPAOfflineDB;
  const DEFAULT_STATIONS=['SBGR','SBMT','SBSP','SBKP'];
  const CATALOG_URL='./offline/catalog.json';
  const fmtBytes=n=>{n=Number(n||0);if(n<1024)return n+' B';if(n<1048576)return (n/1024).toFixed(1)+' KB';return (n/1048576).toFixed(1)+' MB'};
  async function persistent(){if(!navigator.storage?.persist)return {supported:false,granted:false};let already=await navigator.storage.persisted();if(already)return {supported:true,granted:true};return {supported:true,granted:await navigator.storage.persist()};}
  async function fetchJson(url){const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error(`${url}: HTTP ${r.status}`);return r.json();}
  async function storeJson(key,kind,obj,meta={}){const text=JSON.stringify(obj),blob=new Blob([text],{type:'application/json'});await DB().putAtomic({key,kind,blob,size:blob.size,meta});return {key,size:blob.size,meta};}
  function productTime(item){return item?.observationTime||item?.issueTime||item?.validTime||''}
  async function storeWeatherFeed(type,feed){type=String(type).toLowerCase();const meta={type,source:feed.source||'AviationWeather.gov',feedGeneratedAt:feed.generatedAt||'',downloadedAt:new Date().toISOString(),recordCount:Object.keys(feed.stations||{}).length};return storeJson(`feed:${type}:current`,'weather-feed',feed,meta)}
  async function storeWeatherProduct(type,icao,feed,item){type=String(type).toLowerCase();icao=String(icao).toUpperCase();const meta={icao,type,source:feed.source||'AviationWeather.gov',feedGeneratedAt:feed.generatedAt||'',productTime:productTime(item),downloadedAt:new Date().toISOString()};return storeJson(`wx:${type}:${icao}`,'weather',{...item,...meta},meta)}
  async function syncWeatherFeeds(){const [metars,tafs]=await Promise.all([fetchJson('./weather/metars.json'),fetchJson('./weather/tafs.json')]);const out=[];out.push(await storeWeatherFeed('metar',metars));out.push(await storeWeatherFeed('taf',tafs));return {metars,tafs,out};}
  async function syncWeatherStation(icao,feeds=null){icao=String(icao||'').trim().toUpperCase();if(!icao)throw new Error('ICAO obrigatório');const {metars,tafs}=feeds||await syncWeatherFeeds();const out=[];for(const [type,feed] of [['metar',metars],['taf',tafs]]){const item=feed.stations?.[icao];if(!item)continue;out.push(await storeWeatherProduct(type,icao,feed,item));}return out;}
  async function loadCatalog(){return fetchJson(CATALOG_URL)}
  function stableChartKey(e){return `chart:${e.icao||'BR'}:${e.type||'GEN'}:${e.code||e.name||e.id}`.replace(/\s+/g,'_')}
  async function syncChart(entry){const key=stableChartKey(entry);const old=await DB().get(key);if(old&&entry.amdt&&old.meta?.amdt===entry.amdt&&old.meta?.effectiveDate===entry.effectiveDate)return {key,size:old.size||0,meta:old.meta,skipped:true};const url=entry.assetUrl||entry.downloadUrl;if(!url)throw new Error(`Carta ${entry.name||entry.id}: sem URL de download no catálogo`);const r=await fetch(url,{cache:'no-store',mode:'cors'});if(!r.ok)throw new Error(`${entry.name||entry.id}: HTTP ${r.status}`);const blob=await r.blob();if(blob.size<1000)throw new Error(`${entry.name||entry.id}: ficheiro demasiado pequeno (${blob.size} B)`);const meta={...entry,downloadedAt:new Date().toISOString(),contentType:blob.type||r.headers.get('content-type')||'',size:blob.size};
    // IndexedDB transaction replaces the stable key atomically. If this write fails, the old record remains.
    await DB().putAtomic({key,kind:'chart',blob,size:blob.size,meta});return {key,size:blob.size,meta};
  }
  async function syncAll({stations=DEFAULT_STATIONS,onProgress=()=>{}}={}){const report={weather:{ok:0,feeds:0,fail:[]},charts:{ok:0,skipped:0,removed:0,fail:[]},startedAt:new Date().toISOString()};
    let feeds;try{feeds=await syncWeatherFeeds();report.weather.feeds=feeds.out.length;report.weather.ok+=feeds.out.length;onProgress(`METAR/TAF: última publicação baixada para a base offline (${feeds.metars.stations?Object.keys(feeds.metars.stations).length:0} METAR / ${feeds.tafs.stations?Object.keys(feeds.tafs.stations).length:0} TAF)`)}catch(e){report.weather.fail.push({icao:'FEEDS',error:e.message});onProgress(`METAR/TAF: ${e.message}`)}
    for(const icao of stations){try{const x=await syncWeatherStation(icao,feeds);report.weather.ok+=x.length;onProgress(`METEO ${icao}: ${x.length} produto(s) guardado(s)`)}catch(e){report.weather.fail.push({icao,error:e.message});onProgress(`METEO ${icao}: ${e.message}`)}}
    let catalog;try{catalog=await loadCatalog()}catch(e){report.charts.fail.push({id:'catalog',error:e.message});return report}
    const entries=(catalog.entries||[]).filter(e=>e.downloadable!==false);
    for(let i=0;i<entries.length;i++){const e=entries[i];try{const x=await syncChart(e);if(x.skipped){report.charts.skipped++;onProgress(`CARTA ${i+1}/${entries.length}: ${e.name} • já atual (${e.amdt||'mesma edição'})`)}else{report.charts.ok++;onProgress(`CARTA ${i+1}/${entries.length}: ${e.name} • ${fmtBytes(x.size)}`)}}catch(err){report.charts.fail.push({id:e.id||e.name,error:err.message});onProgress(`CARTA ${e.name}: mantida versão anterior • ${err.message}`)}}
    const activeKeys=new Set(entries.map(stableChartKey));for(const r of (await DB().all()).filter(x=>x.kind==='chart')){if(!activeKeys.has(r.key)){await DB().remove(r.key);report.charts.removed++;onProgress(`CARTA retirada do catálogo: ${r.meta?.name||r.key} • cópia antiga removida`)}}report.finishedAt=new Date().toISOString();return report;
  }
  async function status(){const rows=await DB().all(),catalog=await loadCatalog().catch(()=>({entries:[]}));const charts=rows.filter(r=>r.kind==='chart'),weather=rows.filter(r=>r.kind==='weather');return {rows,charts,weather,catalog,stats:await DB().stats()};}
  async function objectUrl(key){const r=await DB().get(key);if(!r?.blob)return null;return URL.createObjectURL(r.blob)}
  window.PPAOfflineSync={persistent,storeWeatherFeed,storeWeatherProduct,syncWeatherFeeds,syncWeatherStation,loadCatalog,syncChart,syncAll,status,objectUrl,stableChartKey,DEFAULT_STATIONS,fmtBytes};
})();
