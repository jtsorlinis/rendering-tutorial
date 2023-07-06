import{d as p}from"./konva-7e7c46bb.js";function c(e,r){for(var o=0;o<r.length;o++){const t=r[o];if(typeof t!="string"&&!Array.isArray(t)){for(const a in t)if(a!=="default"&&!(a in e)){const s=Object.getOwnPropertyDescriptor(t,a);s&&Object.defineProperty(e,a,s.get?s:{enumerable:!0,get:()=>t[a]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var n,l;function u(){if(l)return n;l=1,n=e,e.displayName="splunkSpl",e.aliases=[];function e(r){r.languages["splunk-spl"]={comment:/`comment\("(?:\\.|[^\\"])*"\)`/,string:{pattern:/"(?:\\.|[^\\"])*"/,greedy:!0},keyword:/\b(?:abstract|accum|addcoltotals|addinfo|addtotals|analyzefields|anomalies|anomalousvalue|anomalydetection|append|appendcols|appendcsv|appendlookup|appendpipe|arules|associate|audit|autoregress|bin|bucket|bucketdir|chart|cluster|cofilter|collect|concurrency|contingency|convert|correlate|datamodel|dbinspect|dedup|delete|delta|diff|erex|eval|eventcount|eventstats|extract|fieldformat|fields|fieldsummary|filldown|fillnull|findtypes|folderize|foreach|format|from|gauge|gentimes|geom|geomfilter|geostats|head|highlight|history|iconify|input|inputcsv|inputlookup|iplocation|join|kmeans|kv|kvform|loadjob|localize|localop|lookup|makecontinuous|makemv|makeresults|map|mcollect|metadata|metasearch|meventcollect|mstats|multikv|multisearch|mvcombine|mvexpand|nomv|outlier|outputcsv|outputlookup|outputtext|overlap|pivot|predict|rangemap|rare|regex|relevancy|reltime|rename|replace|rest|return|reverse|rex|rtorder|run|savedsearch|script|scrub|search|searchtxn|selfjoin|sendemail|set|setfields|sichart|sirare|sistats|sitimechart|sitop|sort|spath|stats|strcat|streamstats|table|tags|tail|timechart|timewrap|top|transaction|transpose|trendline|tscollect|tstats|typeahead|typelearner|typer|union|uniq|untable|where|x11|xmlkv|xmlunescape|xpath|xyseries)\b/i,"operator-word":{pattern:/\b(?:and|as|by|not|or|xor)\b/i,alias:"operator"},function:/\b\w+(?=\s*\()/,property:/\b\w+(?=\s*=(?!=))/,date:{pattern:/\b\d{1,2}\/\d{1,2}\/\d{1,4}(?:(?::\d{1,2}){3})?\b/,alias:"number"},number:/\b\d+(?:\.\d+)?\b/,boolean:/\b(?:f|false|t|true)\b/i,operator:/[<>=]=?|[-+*/%|]/,punctuation:/[()[\],]/}}return n}var i=u();const d=p(i),f=c({__proto__:null,default:d},[i]);export{f as s};
