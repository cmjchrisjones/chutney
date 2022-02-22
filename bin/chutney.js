import e from"fs/promises";import t from"path";import a from"handlebars";import{unified as r}from"unified";import i from"remark-parse";import o from"remark-frontmatter";import s from"remark-rehype";import c from"remark-parse-yaml";import n from"rehype-stringify";import l from"rehype-raw";async function p(a,r){await e.mkdir(r,{recursive:!0});const i=await e.readdir(a,{withFileTypes:!0});for(const o of i){const i=t.join(a,o.name),s=t.join(r,o.name);o.isDirectory()?await p(i,s):await e.copyFile(i,s)}}async function d(){await p("./public","./dist")}let u={};async function f(e){return u=e,await m("./src/pages/")}async function m(p){const d=[];try{const f=await e.readdir(p),y=`./dist/${p.replace("./src/pages/","")}`;try{await e.readdir(y)}catch(t){await e.mkdir(y)}for(const $ of f){const{ext:f}=t.parse($);if(f){const t=await e.readFile(`${p}${$}`,"utf-8");let m={};const h=await r().use(i).use(o).use(c).use((()=>e=>{const t=e.children.find((e=>"yaml"==e.type));return t&&t.data&&(m=t.data.parsedValue),e})).use(s,{allowDangerousHtml:!0}).use(l).use(n).process(t);let g=m.layout||"default",k="";try{k=await e.readFile(`./src/layouts/${g}.html`,"utf-8")}catch(e){}const x=String(h);k=k.replace("{{chutneyPage}}",x);const F=a.compile(k);let b="";if($.includes("[")){const t=y.split("/").slice(-2)[0],a=$.replace(f,"").replace("[","").replace("]",""),r=u[t];if(r&&Array.isArray(r))for(const t of r){const r=F({...u,...t}),i=w(t,a);try{await e.readdir(`${y}${i}/`)}catch(t){await e.mkdir(`${y}${i}/`)}await e.writeFile(`${y}${i}/index.html`,r),b=`${y}${i}`,console.log(m),d.push({title:t.title||m.title,description:t.description||m.description||"",publishedAt:new Date(t.publishedAt||m.publishedAt||new Date),route:`/${b.replace("./dist/","")}/`})}}else{const t=F({...u});if("index"!==$.replace(f,"").toLocaleLowerCase()){try{await e.readdir(`${y}${$.replace(f,"")}/`)}catch(t){await e.mkdir(`${y}${$.replace(f,"")}/`)}await e.writeFile(`${y}${$.replace(f,"")}/index.html`,t),b=`${y}${$.replace(f,"")}/`}else await e.writeFile(`${y}index.html`,t),b=`${y}`;d.push({title:m.title,description:m.description,publishedAt:m.publishedAt||new Date,route:`/${b.replace("./dist/","")}`})}}else d.push(...await m(`${p}${$}/`))}}catch(e){console.log(e),console.log("No pages found.")}return d}function w(e,t){const a=t.split(".");let r=e;for(;a.length>0;)r=r[a[0]],a.splice(0,1);return r}async function y(){const c=await async function(){const a={};try{const r=await e.readdir("./src/data/");for(const e of r){const{ext:r}=t.parse(e),i=(await import(`file://${t.resolve("./src/data/")}/${e}`)).default;a[e.replace(r,"")]=await i()}}catch(e){console.log("No data found.")}return a}();await async function(){try{const c=await e.readdir("./src/components/");for(const p of c){const{ext:c}=t.parse(p),d=await e.readFile(`./src/components/${p}`,"utf-8"),u=await r().use(i).use(o).use(s,{allowDangerousHtml:!0}).use(l).use(n).process(d),f=String(u);a.registerHelper(p.replace(c,""),(e=>{const t=a.compile(f)(e);return new a.SafeString(t)}))}}catch(e){console.log(e),console.log("No snippets found.")}}();const p=await f(c);await async function(e){console.log(e)}(p),await d()}export{y as default};
//# sourceMappingURL=chutney.js.map
