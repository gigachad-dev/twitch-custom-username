var __defProp=Object.defineProperty,__defNormalProp=(s,r,o)=>r in s?__defProp(s,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[r]=o,__publicField=(s,r,o)=>(__defNormalProp(s,typeof r!="symbol"?r+"":r,o),o),__accessCheck=(s,r,o)=>{if(!r.has(s))throw TypeError("Cannot "+o)},__privateGet=(s,r,o)=>(__accessCheck(s,r,"read from private field"),o?o.call(s):r.get(s)),__privateAdd=(s,r,o)=>{if(r.has(s))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(s):r.set(s,o)},__privateSet=(s,r,o,d)=>(__accessCheck(s,r,"write to private field"),d?d.call(s,o):r.set(s,o),o);(function(){var s,r,o;function d(i,t,e){const n=new MutationObserver((a,c)=>{for(const u of a)t(u,c)});return n.observe(i,{childList:!0,subtree:!0,...e}),()=>n.disconnect()}const y="chat-line__message",m="chat-author__display-name",h="data-user-id",l="customNames";function C(){let i;function t(e){if(!i){const n=Object.keys(e);if(!n.length)throw new Error("ReactInstance is not defined");i=n[0]}return e[i]}return{getUserId(e){const n=t(e);return n.return.key?n.return.key.split("-").at(0):null}}}function p(i){return Object.entries(i)}const g=(i,t)=>i;class v{constructor({encode:t=g,decode:e=g,attributes:n={},initialValue:a}={}){if(__privateAdd(this,s,void 0),__privateAdd(this,r,void 0),__privateAdd(this,o,void 0),__privateSet(this,s,t),__privateSet(this,r,e),this.attributes=n,a)for(const[c,u]of p(a))this.has(c)||this.set(c,u)}get attributes(){return __privateGet(this,o)}set attributes(t){__privateSet(this,o,t)}get(t){const e=`; ${document.cookie}`.match(`;\\s*${t}=([^;]+)`);return e?__privateGet(this,r).call(this,decodeURIComponent(e[1]),t):null}set(t,e,n){const a={path:"/",...__privateGet(this,o),...n};typeof a.expires=="number"&&(a.expires=new Date(Date.now()+a.expires*864e5)),a.expires instanceof Date&&(a.expires=a.expires.toUTCString());let c=`${encodeURIComponent(t)}=${encodeURIComponent(__privateGet(this,s).call(this,e,t))}`;for(const[u,I]of p(a))c+=`; ${u}`,I!==!0&&(c+=`=${I}`);document.cookie=c}list(){const t=document.cookie,e=(t?t.split("; "):[]).map(n=>{const[a,c]=n.split(/=(.*)/);return[a,__privateGet(this,r).call(this,decodeURIComponent(c),a)]});return Object.fromEntries(e)}remove(t,e){this.set(t,null,{...e,expires:-1})}has(t){return!!this.get(t)}}s=new WeakMap,r=new WeakMap,o=new WeakMap;class E extends v{constructor(){super({initialValue:{[l]:[]},attributes:{domain:"twitch.tv","max-age":60*60*24*365},encode(t){return JSON.stringify(t)},decode(t){try{return JSON.parse(t)}catch{return null}}}),__publicField(this,"storageValue"),this.storageValue=this.get(l)}addCustomName(t){const e=this.get(l);this.storageValue=e.filter(n=>n[0]!==t[0]),this.storageValue.push(t),this.set(l,this.storageValue)}getCustomNameById(t){const e=this.storageValue.find(n=>n[0]===t);return e?e[1]:null}}const f=new E,_=C();document.addEventListener("contextmenu",i=>{const t=i.target;if(i.ctrlKey&&t.classList.contains(m)){i.preventDefault();const e=_.getUserId(t)||t.parentElement.parentElement.getAttribute(h)||t.parentElement.parentElement.parentElement.getAttribute(h);if(!e){alert("User id is not defined");return}const n=f.getCustomNameById(e),a=prompt(`Set a custom name for ${t.textContent}:`,n??"");if(a===null)return;f.addCustomName([e,a])}}),d(document.body,(i,t)=>{N(i)});function N(i){for(const t of i.addedNodes){if(t.nodeName==="#text")continue;const e=t;if(!e.classList.contains(y))continue;const n=e.querySelector(`.${m}`);if(!n)continue;const a=w(e,n);a&&(n.innerHTML=`${n.textContent} (${a})`)}}function w(i,t){const e=i.getAttribute(h);if(e)return f.getCustomNameById(e);{const n=_.getUserId(t);return n?f.getCustomNameById(n):null}}})();
