import e from"./c-5ef5f2ff.js";import"./index-12161aec.js";import"./konva-6694c3a9.js";c.displayName="cilkc";c.aliases=["cilk-c"];function c(a){a.register(e),a.languages.cilkc=a.languages.insertBefore("c","function",{"parallel-keyword":{pattern:/\bcilk_(?:for|reducer|s(?:cope|pawn|ync))\b/,alias:"keyword"}}),a.languages["cilk-c"]=a.languages.cilkc}export{c as default};