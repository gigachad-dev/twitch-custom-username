// ==UserScript==
// @name        twitch-custom-username
// @version     0.0.2
// @author      crashmax <userscript@crashmax.ru>
// @license     MIT
// @homepage    https://gigachad-dev.github.io/twitch-custom-username/
// @match       https://*.twitch.tv/*
// @updateURL   https://gigachad-dev.github.io/twitch-custom-username/twitch-custom-username.meta.js
// @downloadURL https://gigachad-dev.github.io/twitch-custom-username/twitch-custom-username.user.js
// ==/UserScript==

var __defProp=Object.defineProperty,__defNormalProp=(r,s,o)=>s in r?__defProp(r,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[s]=o,__publicField=(r,s,o)=>(__defNormalProp(r,typeof s!="symbol"?s+"":s,o),o),__accessCheck=(r,s,o)=>{if(!s.has(r))throw TypeError("Cannot "+o)},__privateGet=(r,s,o)=>(__accessCheck(r,s,"read from private field"),o?o.call(r):s.get(r)),__privateAdd=(r,s,o)=>{if(s.has(r))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(r):s.set(r,o)},__privateSet=(r,s,o,d)=>(__accessCheck(r,s,"write to private field"),d?d.call(r,o):s.set(r,o),o);(function(){var r,s,o;function d(i,t,e){const n=new MutationObserver((a,c)=>{for(const u of a)t(u,c)});return n.observe(i,{childList:!0,subtree:!0,...e}),()=>n.disconnect()}function g(){let i;function t(e){if(!i){const n=Object.keys(e);if(!n.length)throw new Error("ReactInstance is not defined");i=n[0]}return e[i]}return{getUserId(e){const n=t(e);return n.return.key?n.return.key.split("-").at(0):null}}}function m(i){return Object.entries(i)}const h=(i,t)=>i;class _{constructor({encode:t=h,decode:e=h,attributes:n={},initialValue:a}={}){if(__privateAdd(this,r,void 0),__privateAdd(this,s,void 0),__privateAdd(this,o,void 0),__privateSet(this,r,t),__privateSet(this,s,e),this.attributes=n,a)for(const[c,u]of m(a))this.has(c)||this.set(c,u)}get attributes(){return __privateGet(this,o)}set attributes(t){__privateSet(this,o,t)}get(t){const e=`; ${document.cookie}`.match(`;\\s*${t}=([^;]+)`);return e?__privateGet(this,s).call(this,decodeURIComponent(e[1]),t):null}set(t,e,n){const a={path:"/",...__privateGet(this,o),...n};typeof a.expires=="number"&&(a.expires=new Date(Date.now()+a.expires*864e5)),a.expires instanceof Date&&(a.expires=a.expires.toUTCString());let c=`${encodeURIComponent(t)}=${encodeURIComponent(__privateGet(this,r).call(this,e,t))}`;for(const[u,p]of m(a))c+=`; ${u}`,p!==!0&&(c+=`=${p}`);document.cookie=c}list(){const t=document.cookie,e=(t?t.split("; "):[]).map(n=>{const[a,c]=n.split(/=(.*)/);return[a,__privateGet(this,s).call(this,decodeURIComponent(c),a)]});return Object.fromEntries(e)}remove(t,e){this.set(t,null,{...e,expires:-1})}has(t){return!!this.get(t)}}r=new WeakMap,s=new WeakMap,o=new WeakMap;class y extends _{constructor(){super({initialValue:{customNames:[]},attributes:{domain:"twitch.tv","max-age":60*60*24*365},encode(t){return JSON.stringify(t)},decode(t){try{return JSON.parse(t)}catch{return null}}}),__publicField(this,"storageValue"),this.storageValue=this.get("customNames")}addCustomName(t){const e=this.get("customNames");this.storageValue=e.filter(n=>n[0]!==t[0]),this.storageValue.push(t),this.set("customNames",this.storageValue)}getCustomNameById(t){const e=this.storageValue.find(n=>n[0]===t);return e?e[1]:null}}const l=new y,f=g();document.addEventListener("contextmenu",i=>{const t=i.target;if(i.ctrlKey&&t.classList.contains("chat-author__display-name")){i.preventDefault();const e=f.getUserId(t)||t.parentElement.parentElement.parentElement.getAttribute("data-user-id"),n=l.getCustomNameById(e),a=prompt(`Set a custom name for ${t.textContent}:`,n??"");if(a===null)return;l.addCustomName([e,a])}}),d(document.body,(i,t)=>{I(i)});function I(i){for(const t of i.addedNodes){if(t.nodeName==="#text")continue;const e=t;if(!e.classList.contains("chat-line__message"))continue;const n=e.querySelector(".chat-author__display-name");if(!n)continue;const a=v(e,n);a&&(n.textContent=`${n.textContent} (${a})`)}}function v(i,t){const e=i.getAttribute("data-user-id");if(e)return l.getCustomNameById(e);{const n=f.getUserId(t);return n?l.getCustomNameById(n):null}}})();
