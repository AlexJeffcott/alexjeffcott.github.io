import * as unstableRoute from "jsr:@std/http/unstable-route";
import { serveDir, serveFile } from "jsr:@std/http/file-server";

const routes: unstableRoute.Route[] = [
  {
    pattern: new URLPattern({ pathname: "/*{.:ext}" }),
    handler: (req: Request) => serveDir(req)
  },
  {
    pattern: new URLPattern({ pathname: "/build/*" }),
    handler: (req: Request) => serveDir(req)
  },
  {
    pattern: new URLPattern({ pathname: "/static/*" }),
    handler: (req: Request) => serveDir(req)
  }
];

function defaultHandler(req: Request) {
  // return new Response("Not found", { status: 404 });
  return serveFile(req, 'index.html')
}

Deno.serve(unstableRoute.route(routes, defaultHandler));
