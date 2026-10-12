# Static export for Vercel

The site is a TanStack Start app built for Cloudflare Workers (the Higgsfield builder template).
Vercel hosts a static export of it:

    cd app && bun install && bun --bun run build
    cd ../export
    sed 's#"cloudflare:workers"#"./cf-stub.mjs"#g' ../app/dist/server/server.js > server.node.mjs
    node render.mjs                       # renders / through the server bundle -> out/index.html
    rsync -a --delete --exclude presets ../app/dist/client/ out/
    cp vercel.json out/vercel.json
    cd out && vercel deploy --prod -y     # project: kuka-simwinga (Joel's Vercel)

`server.node.mjs` and `out/` are build products and are not committed.
