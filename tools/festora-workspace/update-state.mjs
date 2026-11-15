import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const file=path.join(path.dirname(fileURLToPath(import.meta.url)),"state.json");
if(!process.argv[2]){console.error('Usage: node tools/festora-workspace/update-state.mjs \'{"task":"..."}\'');process.exit(1)}
try{
 const patch=JSON.parse(process.argv[2]);const current=JSON.parse(await fs.readFile(file,"utf8"));
 const next={...current,...patch,statuses:{...current.statuses,...(patch.statuses||{})},checks:{...current.checks,...(patch.checks||{})},notes:[...(current.notes||[]),...(Array.isArray(patch.notes)?patch.notes:[])].slice(-50),updatedAt:new Date().toISOString()};
 await fs.writeFile(file,JSON.stringify(next,null,2)+"\n");console.log("Workspace state updated.");
}catch(e){console.error("Could not update workspace state:",e.message);process.exit(1)}
