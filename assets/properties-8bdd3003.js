t.displayName="properties";t.aliases=[];function t(a){a.languages.properties={comment:/^[ \t]*[#!].*$/m,value:{pattern:/(^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+(?: *[=:] *(?! )| ))(?:\\(?:\r\n|[\s\S])|[^\\\r\n])+/m,lookbehind:!0,alias:"attr-value"},key:{pattern:/^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+(?= *[=:]| )/m,alias:"attr-name"},punctuation:/[=:]/}}export{t as default};
