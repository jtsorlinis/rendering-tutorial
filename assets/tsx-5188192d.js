import{d as l}from"./konva-7e7c46bb.js";import{r as c}from"./jsx-4ca07b4a.js";import{t as f}from"./index-b5505e2b.js";function i(a,o){for(var r=0;r<o.length;r++){const t=o[r];if(typeof t!="string"&&!Array.isArray(t)){for(const e in t)if(e!=="default"&&!(e in a)){const s=Object.getOwnPropertyDescriptor(t,e);s&&Object.defineProperty(a,e,s.get?s:{enumerable:!0,get:()=>t[e]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}var p,u;function x(){if(u)return p;u=1;var a=c(),o=f;p=r,r.displayName="tsx",r.aliases=[];function r(t){t.register(a),t.register(o),function(e){var s=e.util.clone(e.languages.typescript);e.languages.tsx=e.languages.extend("jsx",s),delete e.languages.tsx.parameter,delete e.languages.tsx["literal-property"];var n=e.languages.tsx.tag;n.pattern=RegExp(/(^|[^\w$]|(?=<\/))/.source+"(?:"+n.pattern.source+")",n.pattern.flags),n.lookbehind=!0}(t)}return p}var g=x();const d=l(g),_=i({__proto__:null,default:d},[g]);export{_ as t};
