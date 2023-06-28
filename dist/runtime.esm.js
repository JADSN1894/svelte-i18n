import{writable as e,derived as n}from"svelte/store";import t from"deepmerge";import o from"intl-messageformat";const i={},r=(e,n,t)=>t?(n in i||(i[n]={}),e in i[n]||(i[n][e]=t),t):t,s=(e,n)=>{if(null==n)return;if(n in i&&e in i[n])return i[n][e];const t=E(n);for(let o=0;o<t.length;o++){const i=c(t[o],e);if(i)return r(e,n,i)}};let l;const a=e({});function u(e){return e in l}function c(e,n){if(!u(e))return null;const t=function(e){return l[e]||null}(e);return function(e,n){if(null==n)return;if(n in e)return e[n];const t=n.split(".");let o=e;for(let e=0;e<t.length;e++)if("object"==typeof o){if(e>0){const n=t.slice(e,t.length).join(".");if(n in o){o=o[n];break}}o=o[t[e]]}else o=void 0;return o}(t,n)}function m(e,...n){delete i[e],a.update((o=>(o[e]=t.all([o[e]||{},...n]),o)))}const f=n([a],(([e])=>Object.keys(e)));a.subscribe((e=>l=e));const d={};function g(e){return d[e]}function h(e){return null!=e&&E(e).some((e=>{var n;return null===(n=g(e))||void 0===n?void 0:n.size}))}function w(e,n){const t=Promise.all(n.map((n=>(function(e,n){d[e].delete(n),0===d[e].size&&delete d[e]}(e,n),n().then((e=>e.default||e))))));return t.then((n=>m(e,...n)))}const p={};function b(e){if(!h(e))return e in p?p[e]:Promise.resolve();const n=function(e){return E(e).map((e=>{const n=g(e);return[e,n?[...n]:[]]})).filter((([,e])=>e.length>0))}(e);return p[e]=Promise.all(n.map((([e,n])=>w(e,n)))).then((()=>{if(h(e))return b(e);delete p[e]})),p[e]}function y(e,n){g(e)||function(e){d[e]=new Set}(e);const t=g(e);g(e).has(n)||(u(e)||a.update((n=>(n[e]={},n))),t.add(n))}function v({locale:e,id:n}){console.warn(`[svelte-i18n] The message "${n}" was not found in "${E(e).join('", "')}".${h(D())?"\n\nNote: there are at least one loader still registered to this locale that wasn't executed.":""}`)}const M={fallbackLocale:null,loadingDelay:200,formats:{number:{scientific:{notation:"scientific"},engineering:{notation:"engineering"},compactLong:{notation:"compact",compactDisplay:"long"},compactShort:{notation:"compact",compactDisplay:"short"}},date:{short:{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},long:{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{short:{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},long:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}},warnOnMissingMessages:!0,handleMissingMessage:void 0,ignoreTag:!0};function j(){return M}function O(e){const{formats:n,...t}=e,o=e.initialLocale||e.fallbackLocale;return t.warnOnMissingMessages&&(delete t.warnOnMissingMessages,null==t.handleMissingMessage?t.handleMissingMessage=v:console.warn('[svelte-i18n] The "warnOnMissingMessages" option is deprecated. Please use the "handleMissingMessage" option instead.')),Object.assign(M,t,{initialLocale:o}),n&&("number"in n&&Object.assign(M.formats.number,n.number),"date"in n&&Object.assign(M.formats.date,n.date),"time"in n&&Object.assign(M.formats.time,n.time)),x.set(o)}const $=e(!1);let k;const T=e(null);function L(e){return e.split("-").map(((e,n,t)=>t.slice(0,n+1).join("-"))).reverse()}function E(e,n=j().fallbackLocale){const t=L(e);return n?[...new Set([...t,...L(n)])]:t}function D(){return null!=k?k:void 0}T.subscribe((e=>{k=null!=e?e:void 0,"undefined"!=typeof window&&null!=e&&document.documentElement.setAttribute("lang",e)}));const x={...T,set:e=>{if(e&&function(e){if(null==e)return;const n=E(e);for(let e=0;e<n.length;e++){const t=n[e];if(u(t))return t}}(e)&&h(e)){const{loadingDelay:n}=j();let t;return"undefined"!=typeof window&&null!=D()&&n?t=window.setTimeout((()=>$.set(!0)),n):$.set(!0),b(e).then((()=>{T.set(e)})).finally((()=>{clearTimeout(t),$.set(!1)}))}return T.set(e)}},N=(e,n)=>{const t=e.split("&").find((e=>0===e.indexOf(`${n}=`)));return t?t.split("=").pop():null},A=(e,n)=>{const t=n.exec(e);return t&&t[1]||null},P=e=>"undefined"==typeof window?null:A(window.location.hostname,e),S=e=>"undefined"==typeof window?null:A(window.location.pathname,e),z=()=>"undefined"==typeof window?null:window.navigator.language||window.navigator.languages[0],F=e=>"undefined"==typeof window?null:N(window.location.search.substr(1),e),I=e=>"undefined"==typeof window?null:N(window.location.hash.substr(1),e),Z=e=>{const n=Object.create(null);return t=>{const o=JSON.stringify(t);return o in n?n[o]:n[o]=e(t)}},C=(e,n)=>{const{formats:t}=j();if(e in t&&n in t[e])return t[e][n];throw new Error(`[svelte-i18n] Unknown "${n}" ${e} format.`)},G=Z((({locale:e,format:n,...t})=>{if(null==e)throw new Error('[svelte-i18n] A "locale" must be set to format numbers');return n&&(t=C("number",n)),new Intl.NumberFormat(e,t)})),J=Z((({locale:e,format:n,...t})=>{if(null==e)throw new Error('[svelte-i18n] A "locale" must be set to format dates');return n?t=C("date",n):0===Object.keys(t).length&&(t=C("date","short")),new Intl.DateTimeFormat(e,t)})),U=Z((({locale:e,format:n,...t})=>{if(null==e)throw new Error('[svelte-i18n] A "locale" must be set to format time values');return n?t=C("time",n):0===Object.keys(t).length&&(t=C("time","short")),new Intl.DateTimeFormat(e,t)})),V=({locale:e=D(),...n}={})=>G({locale:e,...n}),_=({locale:e=D(),...n}={})=>J({locale:e,...n}),q=({locale:e=D(),...n}={})=>U({locale:e,...n}),B=Z(((e,n=D())=>new o(e,n,j().formats,{ignoreTag:j().ignoreTag}))),H=(e,n={})=>{var t,o,i,r;let l=n;"object"==typeof e&&(l=e,e=l.id);const{values:a,locale:u=D(),default:c}=l;if(null==u)throw new Error("[svelte-i18n] Cannot format a message without first setting the initial locale.");let m=s(e,u);if(m){if("string"!=typeof m)return console.warn(`[svelte-i18n] Message with id "${e}" must be of type "string", found: "${typeof m}". Gettin its value through the "$format" method is deprecated; use the "json" method instead.`),m}else m=null!==(r=null!==(i=null===(o=(t=j()).handleMissingMessage)||void 0===o?void 0:o.call(t,{locale:u,id:e,defaultValue:c}))&&void 0!==i?i:c)&&void 0!==r?r:e;if(!a)return m;let f=m;try{f=B(m,u).format(a)}catch(n){n instanceof Error&&console.warn(`[svelte-i18n] Message "${e}" has syntax error:`,n.message)}return f},K=(e,n)=>q(n).format(e),Q=(e,n)=>_(n).format(e),R=(e,n)=>V(n).format(e),W=(e,n=D())=>s(e,n),X=n([x,a],(()=>H)),Y=n([x],(()=>K)),ee=n([x],(()=>Q)),ne=n([x],(()=>R)),te=n([x,a],(()=>W));function oe(e){let n;const t=e.subscribe((e=>n=e)),o=(...e)=>n(...e);return o.freeze=t,o}function ie(e){return e}function re(e){return b(e||D()||j().initialLocale)}export{X as _,m as addMessages,ee as date,ie as defineMessages,a as dictionary,X as format,_ as getDateFormatter,I as getLocaleFromHash,P as getLocaleFromHostname,z as getLocaleFromNavigator,S as getLocaleFromPathname,F as getLocaleFromQueryString,B as getMessageFormatter,V as getNumberFormatter,q as getTimeFormatter,O as init,$ as isLoading,te as json,x as locale,f as locales,ne as number,y as register,X as t,Y as time,oe as unwrapFunctionStore,re as waitLocale};