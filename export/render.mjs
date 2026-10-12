import { writeFileSync, mkdirSync } from "node:fs";
const mod = await import("./server.node.mjs");
const handler = mod.default ?? mod;
const req = new Request("https://kuka-simwinga.vercel.app/", { headers: { accept: "text/html", "user-agent": "render" } });
const res = await handler.fetch(req, { HF_ENV: "production" }, { waitUntil() {}, passThroughOnException() {} });
const html = await res.text();
console.log("status", res.status, "bytes", html.length, "content-type", res.headers.get("content-type"));
mkdirSync("out", { recursive: true });
writeFileSync("out/index.html", html);
