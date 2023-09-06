const out = await Bun.build({
  entrypoints: ["example1.tsx", "example2.tsx"],
  splitting: true,
  outdir: "dist"
})

console.log(`Build status: ${out.success}`)

if (!out.success) {
  console.log(`Bundle Logs:`)
  out.logs.forEach( log => {
    console.log(`\t${log.message}`)
  })
}

if (out.success) {
  console.log(`Checking for node_modules import`)
  out.outputs.forEach(async o => {
    const text = await o.text()

    // removing comments
    const lines = text.split("\n").filter(l => l.slice(0, 2) !== '//')

    lines.forEach((l, i) => {
      if (l.includes("node_modules")) {
        console.log(`${o.path} has "node_module" import`)
        console.log(`line:${i+1}\t${l}\n`)
      }
    })
  })
}

