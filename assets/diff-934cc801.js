import{d as u}from"./konva-7e7c46bb.js";function l(t,n){for(var f=0;f<n.length;f++){const r=n[f];if(typeof r!="string"&&!Array.isArray(r)){for(const e in r)if(e!=="default"&&!(e in t)){const i=Object.getOwnPropertyDescriptor(r,e);i&&Object.defineProperty(t,e,i.get?i:{enumerable:!0,get:()=>r[e]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}var o,d;function c(){if(d)return o;d=1,o=t,t.displayName="diff",t.aliases=[];function t(n){(function(f){f.languages.diff={coord:[/^(?:\*{3}|-{3}|\+{3}).*$/m,/^@@.*@@$/m,/^\d.*$/m]};var r={"deleted-sign":"-","deleted-arrow":"<","inserted-sign":"+","inserted-arrow":">",unchanged:" ",diff:"!"};Object.keys(r).forEach(function(e){var i=r[e],a=[];/^\w+$/.test(e)||a.push(/\w+/.exec(e)[0]),e==="diff"&&a.push("bold"),f.languages.diff[e]={pattern:RegExp("^(?:["+i+`].*(?:\r
?|
|(?![\\s\\S])))+`,"m"),alias:a,inside:{line:{pattern:/(.)(?=[\s\S]).*(?:\r\n?|\n)?/,lookbehind:!0},prefix:{pattern:/[\s\S]/,alias:/\w+/.exec(e)[0]}}}}),Object.defineProperty(f.languages.diff,"PREFIXES",{value:r})})(n)}return o}var s=c();const p=u(s),b=l({__proto__:null,default:p},[s]);export{b as d};