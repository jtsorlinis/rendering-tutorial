import c from"./cpp-5def8c3e.js";import"./c-bdd5e61a.js";import"./index-78bd1cfb.js";import"./konva-e1600009.js";a.displayName="cilkcpp";a.aliases=["cilk","cilk-cpp"];function a(p){p.register(c),p.languages.cilkcpp=p.languages.insertBefore("cpp","function",{"parallel-keyword":{pattern:/\bcilk_(?:for|reducer|s(?:cope|pawn|ync))\b/,alias:"keyword"}}),p.languages["cilk-cpp"]=p.languages.cilkcpp,p.languages.cilk=p.languages.cilkcpp}export{a as default};
