import{c as r}from"./index-78bd1cfb.js";import"./konva-e1600009.js";t.displayName="squirrel";t.aliases=[];function t(e){e.register(r),e.languages.squirrel=e.languages.extend("clike",{comment:[e.languages.clike.comment[0],{pattern:/(^|[^\\:])(?:\/\/|#).*/,lookbehind:!0,greedy:!0}],string:{pattern:/(^|[^\\"'@])(?:@"(?:[^"]|"")*"(?!")|"(?:[^\\\r\n"]|\\.)*")/,lookbehind:!0,greedy:!0},"class-name":{pattern:/(\b(?:class|enum|extends|instanceof)\s+)\w+(?:\.\w+)*/,lookbehind:!0,inside:{punctuation:/\./}},keyword:/\b(?:__FILE__|__LINE__|base|break|case|catch|class|clone|const|constructor|continue|default|delete|else|enum|extends|for|foreach|function|if|in|instanceof|local|null|resume|return|static|switch|this|throw|try|typeof|while|yield)\b/,number:/\b(?:0x[0-9a-fA-F]+|\d+(?:\.(?:\d+|[eE][+-]?\d+))?)\b/,operator:/\+\+|--|<=>|<[-<]|>>>?|&&?|\|\|?|[-+*/%!=<>]=?|[~^]|::?/,punctuation:/[(){}\[\],;.]/}),e.languages.insertBefore("squirrel","string",{char:{pattern:/(^|[^\\"'])'(?:[^\\']|\\(?:[xuU][0-9a-fA-F]{0,8}|[\s\S]))'/,lookbehind:!0,greedy:!0}}),e.languages.insertBefore("squirrel","operator",{"attribute-punctuation":{pattern:/<\/|\/>/,alias:"important"},lambda:{pattern:/@(?=\()/,alias:"operator"}})}export{t as default};
