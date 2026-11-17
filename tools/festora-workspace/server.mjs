import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const WORKSPACE_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORKSPACE_DIR, "../..");
const STATE_FILE = path.join(WORKSPACE_DIR, "state.json");
const HOST = "127.0.0.1";
const PORT = Number(process.env.PORT || 4173);
const TYPES = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".mjs":"text/javascript; charset=utf-8",".json":"application/json; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".ico":"image/x-icon",".woff":"font/woff",".woff2":"font/woff2"};
const IGNORED_DIRS = new Set([".git","node_modules",".vercel",".next","dist","build"]);
const PREVIEW_EXTENSIONS = new Set(Object.keys(TYPES));

async function readState(){return JSON.parse(await fs.readFile(STATE_FILE,"utf8"))}
function send(res,status,body,type="text/plain; charset=utf-8"){res.writeHead(status,{"Content-Type":type,"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"});res.end(body)}
async function previewRevision(){
  const entries=[];
  async function walk(dir){
    let names=[];
    try{names=await fs.readdir(dir,{withFileTypes:true})}catch{return}
    for(const entry of names){
      if(entry.isDirectory()){
        if(!IGNORED_DIRS.has(entry.name)&&!(dir===ROOT&&entry.name==="tools"))await walk(path.join(dir,entry.name));
      }else if(entry.isFile()&&PREVIEW_EXTENSIONS.has(path.extname(entry.name).toLowerCase())){
        const full=path.join(dir,entry.name);
        try{const stat=await fs.stat(full);entries.push(path.relative(ROOT,full).replaceAll(path.sep,"/")+":"+stat.size+":"+stat.mtimeMs)}catch{}
      }
    }
  }
  await walk(ROOT);
  entries.sort();
  return entries.join("|");
}
const server=http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,"http://"+HOST);
    if(req.method==="GET"&&url.pathname==="/__workspace"){send(res,200,await fs.readFile(path.join(WORKSPACE_DIR,"dashboard.html"),"utf8"),"text/html; charset=utf-8");return}
    if(req.method==="GET"&&url.pathname==="/__workspace/state"){send(res,200,JSON.stringify(await readState()),"application/json; charset=utf-8");return}
    if(req.method==="GET"&&url.pathname==="/__workspace/revision"){send(res,200,await previewRevision(),"text/plain; charset=utf-8");return}
    if(req.method==="POST"&&url.pathname==="/__workspace/state"){
      let raw="";for await(const chunk of req){raw+=chunk;if(raw.length>32768){send(res,413,"Payload too large");return}}
      const next=JSON.parse(raw);const current=await readState();
      const merged={...current,...next,statuses:{...current.statuses,...(next.statuses||{})},checks:{...current.checks,...(next.checks||{})},notes:[...(current.notes||[]),...(Array.isArray(next.notes)?next.notes:[])].slice(-50),updatedAt:new Date().toISOString()};
      await fs.writeFile(STATE_FILE,JSON.stringify(merged,null,2)+"\n");send(res,200,JSON.stringify({ok:true,updatedAt:merged.updatedAt}),"application/json; charset=utf-8");return;
    }
    if(req.method!=="GET"){send(res,405,"Method not allowed");return}
    let pathname=decodeURIComponent(url.pathname);if(pathname==="/")pathname="/index.html";
    const file=path.resolve(ROOT,"."+pathname);
    if(file!==ROOT&&!file.startsWith(ROOT+path.sep)){send(res,403,"Forbidden");return}
    const stat=await fs.stat(file);if(!stat.isFile()){send(res,404,"Not found");return}
    send(res,200,await fs.readFile(file),TYPES[path.extname(file).toLowerCase()]||"application/octet-stream");
  }catch(e){send(res,e.code==="ENOENT"?404:400,e.code==="ENOENT"?"Not found":e.message)}
});
server.listen(PORT,HOST,()=>console.log("FESTORA workspace: http://"+HOST+":"+PORT+"/__workspace"));
