var __defProp=Object.defineProperty,__defNormalProp=(i,s,o)=>s in i?__defProp(i,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[s]=o,__publicField=(i,s,o)=>(__defNormalProp(i,typeof s!="symbol"?s+"":s,o),o),__accessCheck=(i,s,o)=>{if(!s.has(i))throw TypeError("Cannot "+o)},__privateGet=(i,s,o)=>(__accessCheck(i,s,"read from private field"),o?o.call(i):s.get(i)),__privateAdd=(i,s,o)=>{if(s.has(i))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(i):s.set(i,o)},__privateSet=(i,s,o,f)=>(__accessCheck(i,s,"write to private field"),f?f.call(i,o):s.set(i,o),o);(function(){var i,s,o;function f(n,t,e){const a=new MutationObserver((r,c)=>{for(const l of r)t(l,c)});return a.observe(n,{childList:!0,subtree:!0,...e}),()=>a.disconnect()}const y="chat-line__message",C="user-notice-line",m="chat-author__display-name",h="data-user-id",d="customNames",_="__reactInternalInstance";class R{constructor(){__publicField(this,"reactInternalInstanceKey",null)}getReactInstance(t){if(!this.reactInternalInstanceKey){const e=Object.keys(t).find(a=>a.startsWith(_));if(!e)throw new Error(`${_} is not defined`);this.reactInternalInstanceKey=e}return t[this.reactInternalInstanceKey]}getUserId(t){const e=this.getReactInstance(t);return e.return.key?e.return.key.split("-").at(0):null}}const E=new R;function S(n){return Object.entries(n)}const g=(n,t)=>n;class N{constructor({encode:t=g,decode:e=g,attributes:a={},initialValue:r}={}){if(__privateAdd(this,i,void 0),__privateAdd(this,s,void 0),__privateAdd(this,o,void 0),__privateSet(this,i,t),__privateSet(this,s,e),this.attributes=a,r)for(const[c,l]of S(r))this.has(c)||this.set(c,l)}get attributes(){return __privateGet(this,o)}set attributes(t){__privateSet(this,o,t)}get(t){const e=`; ${document.cookie}`.match(`;\\s*${t}=([^;]+)`);return e?__privateGet(this,s).call(this,decodeURIComponent(e[1]),t):null}set(t,e,a){const r={path:"/",...__privateGet(this,o),...a};typeof r.expires=="number"&&(r.expires=new Date(Date.now()+r.expires*864e5)),r.expires instanceof Date&&(r.expires=r.expires.toUTCString());let c=`${encodeURIComponent(t)}=${encodeURIComponent(__privateGet(this,i).call(this,e,t))}`;for(const[l,I]of S(r))c+=`; ${l}`,I!==!0&&(c+=`=${I}`);document.cookie=c}list(){const t=document.cookie,e=(t?t.split("; "):[]).map(a=>{const[r,c]=a.split(/=(.*)/);return[r,__privateGet(this,s).call(this,decodeURIComponent(c),r)]});return Object.fromEntries(e)}remove(t,e){this.set(t,null,{...e,expires:-1})}has(t){return!!this.get(t)}}i=new WeakMap,s=new WeakMap,o=new WeakMap;const A=new N({attributes:{domain:"twitch.tv","max-age":60*60*24*365},encode(n){return JSON.stringify(n)},decode(n){try{return JSON.parse(n)}catch{return null}}});class O{constructor(){__publicField(this,"STORAGE_VALUES"),this.init()}get values(){return this.STORAGE_VALUES}init(){if(this.read(),GM_addValueChangeListener(d,(t,e,a,r)=>{r&&(this.STORAGE_VALUES=a)}),!this.STORAGE_VALUES.length){const t=A.get(d);if(!t)return;this.write(t),A.remove(d)}}read(){return this.STORAGE_VALUES=GM_getValue(d,[]),this.STORAGE_VALUES}write(t){t&&(this.STORAGE_VALUES=t),GM_setValue(d,this.STORAGE_VALUES)}addCustomName(t){const[e,a]=t,r=this.read();this.STORAGE_VALUES=r.filter(c=>c[0]!==e),a&&this.STORAGE_VALUES.push(t),this.write()}getCustomNameById(t){const e=this.STORAGE_VALUES.find(a=>a[0]===t);return e?e[1]:null}}const u=new O;function T(n,t){const e=n.getAttribute(h);if(e)return u.getCustomNameById(e);{const a=E.getUserId(t);return a?u.getCustomNameById(a):null}}function U(n){for(const t of n.addedNodes){if(t.nodeName==="#text")continue;const e=t;if(!(e.classList.contains(y)||e.classList.contains(C)))continue;const r=e.querySelector(`.${m}`);if(!r)continue;const c=T(e,r);c&&(r.innerHTML=`${r.textContent} (${c})`)}}function w(n){n.altKey&&n.code==="KeyQ"&&(n.preventDefault(),navigator.clipboard.writeText(JSON.stringify(u.values)).then(()=>alert("Copied to clipboard!")))}function v(n){if(n.altKey&&n.code==="KeyW"){n.preventDefault();const t=prompt("Set a new storage value:",JSON.stringify(u.values));if(!t)return;try{u.write(JSON.parse(t))}catch(e){alert(`Failed to parse JSON: ${e.message}`)}}}function L(n){const t=n.target;if(n.altKey&&t.classList.contains(m)){n.preventDefault();const e=E.getUserId(t)||t.parentElement.parentElement.getAttribute(h)||t.parentElement.parentElement.parentElement.getAttribute(h);if(!e){alert("User id is not defined");return}const a=u.getCustomNameById(e),r=prompt(`Set a custom name for ${t.textContent}:`,a??"");if(r===null)return;u.addCustomName([e,r])}}const p={exportConfig:w,importConfig:v,addCustomUsername:L};document.addEventListener("keydown",n=>{p.importConfig(n),p.exportConfig(n)}),document.addEventListener("contextmenu",n=>{p.addCustomUsername(n)}),f(document.body,n=>U(n))})();
