'use strict';
(function(){
  const DB_NAME='ppa95_offline_v12', DB_VERSION=1, STORE='products';
  function open(){return new Promise((resolve,reject)=>{const r=indexedDB.open(DB_NAME,DB_VERSION);r.onupgradeneeded=()=>{const db=r.result;if(!db.objectStoreNames.contains(STORE)){const s=db.createObjectStore(STORE,{keyPath:'key'});s.createIndex('kind','kind',{unique:false});s.createIndex('updatedAt','updatedAt',{unique:false});}};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
  async function putAtomic(record){if(!record||!record.key)throw new Error('offline record key required');const db=await open();return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readwrite');const s=tx.objectStore(STORE);s.put({...record,updatedAt:new Date().toISOString()});tx.oncomplete=()=>resolve(record.key);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('transaction aborted'));});}
  async function get(key){const db=await open();return new Promise((resolve,reject)=>{const r=db.transaction(STORE,'readonly').objectStore(STORE).get(key);r.onsuccess=()=>resolve(r.result||null);r.onerror=()=>reject(r.error);});}
  async function all(){const db=await open();return new Promise((resolve,reject)=>{const r=db.transaction(STORE,'readonly').objectStore(STORE).getAll();r.onsuccess=()=>resolve(r.result||[]);r.onerror=()=>reject(r.error);});}
  async function remove(key){const db=await open();return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).delete(key);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}
  async function stats(){const rows=await all();return rows.reduce((a,r)=>{a.count++;a.bytes+=Number(r.size||r.blob?.size||0);a.kinds[r.kind]=(a.kinds[r.kind]||0)+1;return a;},{count:0,bytes:0,kinds:{}});}
  window.PPAOfflineDB={open,putAtomic,get,all,remove,stats,DB_NAME};
})();
