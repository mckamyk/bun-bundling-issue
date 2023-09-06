# bun-bundle-bad

Simple reproduction issue of bundling sometimes emitting bundles that import from `node_modules` rather than including that code into a chunk.

```bash
bun install
bun run index.ts
```
