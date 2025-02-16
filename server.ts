import { serveDir, serveFile } from "jsr:@std/http/file-server";

Deno.serve((req: Request) => {
  const pathname = new URL(req.url).pathname;
console.log("!!", pathname)
  if (pathname === "/") {
    return serveFile(req, "./index.html");
  }  else if (pathname.startsWith("/static")) {
    return serveDir(req, {
      fsRoot: "static",
      urlRoot: "static",
    });
 } else {
    return serveDir(req, {
      fsRoot: "build",
      urlRoot: "build",
    }); 
  }
});
