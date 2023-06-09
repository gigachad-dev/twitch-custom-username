var __defProp=Object.defineProperty,__defNormalProp=(a,s,i)=>s in a?__defProp(a,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):a[s]=i,__publicField=(a,s,i)=>(__defNormalProp(a,typeof s!="symbol"?s+"":s,i),i),__accessCheck=(a,s,i)=>{if(!s.has(a))throw TypeError("Cannot "+i)},__privateGet=(a,s,i)=>(__accessCheck(a,s,"read from private field"),i?i.call(a):s.get(a)),__privateAdd=(a,s,i)=>{if(s.has(a))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(a):s.set(a,i)},__privateSet=(a,s,i,f)=>(__accessCheck(a,s,"write to private field"),f?f.call(a,i):s.set(a,i),i);(function(){var a,s,i;function f(n,t,e){const o=new MutationObserver((r,c)=>{for(const l of r)t(l,c)});return o.observe(n,{childList:!0,subtree:!0,...e}),()=>o.disconnect()}const v="chat-line__message",E="user-notice-line",m="chat-author__display-name",p="data-user-id",d="customNames",I="__reactInternalInstance";class N{constructor(){__publicField(this,"reactInternalInstanceKey",null)}getReactInstance(t){if(!this.reactInternalInstanceKey){const e=Object.keys(t).find(o=>o.startsWith(I));if(!e)throw new Error(`${I} is not defined`);this.reactInternalInstanceKey=e}return t[this.reactInternalInstanceKey]}getUserId(t){const e=this.getReactInstance(t);return e.return.key?e.return.key.split("-").at(0):null}}const g=new N;function _(n){return Object.entries(n)}const C=(n,t)=>n;class w{constructor({encode:t=C,decode:e=C,attributes:o={},initialValue:r}={}){if(__privateAdd(this,a,void 0),__privateAdd(this,s,void 0),__privateAdd(this,i,void 0),__privateSet(this,a,t),__privateSet(this,s,e),this.attributes=o,r)for(const[c,l]of _(r))this.has(c)||this.set(c,l)}get attributes(){return __privateGet(this,i)}set attributes(t){__privateSet(this,i,t)}get(t){const e=`; ${document.cookie}`.match(`;\\s*${t}=([^;]+)`);return e?__privateGet(this,s).call(this,decodeURIComponent(e[1]),t):null}set(t,e,o){const r={path:"/",...__privateGet(this,i),...o};typeof r.expires=="number"&&(r.expires=new Date(Date.now()+r.expires*864e5)),r.expires instanceof Date&&(r.expires=r.expires.toUTCString());let c=`${encodeURIComponent(t)}=${encodeURIComponent(__privateGet(this,a).call(this,e,t))}`;for(const[l,y]of _(r))c+=`; ${l}`,y!==!0&&(c+=`=${y}`);document.cookie=c}list(){const t=document.cookie,e=(t?t.split("; "):[]).map(o=>{const[r,c]=o.split(/=(.*)/);return[r,__privateGet(this,s).call(this,decodeURIComponent(c),r)]});return Object.fromEntries(e)}remove(t,e){this.set(t,null,{...e,expires:-1})}has(t){return!!this.get(t)}}a=new WeakMap,s=new WeakMap,i=new WeakMap;class S extends w{constructor(){super({initialValue:{[d]:[]},attributes:{domain:"twitch.tv","max-age":60*60*24*365},encode(t){return JSON.stringify(t)},decode(t){try{return JSON.parse(t)}catch{return null}}}),__publicField(this,"values"),this.values=this.get(d)}write(t){this.values=JSON.parse(t),this.set(d,this.values)}addCustomName(t){const[e,o]=t,r=this.get(d);this.values=r.filter(c=>c[0]!==e),o&&this.values.push(t),this.set(d,this.values)}getCustomNameById(t){const e=this.values.find(o=>o[0]===t);return e?e[1]:null}}const u=new S;function A(n,t){const e=n.getAttribute(p);if(e)return u.getCustomNameById(e);{const o=g.getUserId(t);return o?u.getCustomNameById(o):null}}function x(n){for(const t of n.addedNodes){if(t.nodeName==="#text")continue;const e=t;if(!(e.classList.contains(v)||e.classList.contains(E)))continue;const r=e.querySelector(`.${m}`);if(!r)continue;const c=A(e,r);c&&(r.innerHTML=`${r.textContent} (${c})`)}}function R(n){n.altKey&&n.code==="KeyQ"&&(n.preventDefault(),navigator.clipboard.writeText(JSON.stringify(u.values)).then(()=>alert("Copied to clipboard!")))}function b(n){if(n.altKey&&n.code==="KeyW"){n.preventDefault();const t=prompt("Set a new storage value:",JSON.stringify(u.values));t&&u.write(t)}}function K(n){const t=n.target;if(n.altKey&&t.classList.contains(m)){n.preventDefault();const e=g.getUserId(t)||t.parentElement.parentElement.getAttribute(p)||t.parentElement.parentElement.parentElement.getAttribute(p);if(!e){alert("User id is not defined");return}const o=u.getCustomNameById(e),r=prompt(`Set a custom name for ${t.textContent}:`,o??"");if(r===null)return;u.addCustomName([e,r])}}const h={exportConfig:R,importConfig:b,addCustomUsername:K};document.addEventListener("keydown",n=>{h.importConfig(n),h.exportConfig(n)}),document.addEventListener("contextmenu",n=>{h.addCustomUsername(n)}),f(document.body,n=>x(n))})();
