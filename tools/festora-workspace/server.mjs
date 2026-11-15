import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const STATE_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), "state.json");
const HOST = "127.0.0.1";
const PORT = Number(process.env.PORT || 4173);
const TYPES = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".json":"application/json; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".ico":"image/x-icon"};

async function readState(){return JSON.parse(await fs.readFile(STATE_FILE,"utf8"))}
function send(res,status,body,type="text/plain; charset=utf-8"){res.writeHead(status,{"Content-Type":type,"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"});res.end(body)}
const server=http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,"http://"+HOST);
    if(req.method==="GET"&&url.pathname==="/__workspace"){send(res,200,await fs.readFile(path.join(path.dirname(fileURLToPath(import.meta.url)),"dashboard.html"),"utf8"),"text/html; charset=utf-8");return}
    if(req.method==="GET"&&url.pathname==="/__workspace/state"){send(res,200,JSON.stringify(await readState()),"application/json; charset=utf-8");return}
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
