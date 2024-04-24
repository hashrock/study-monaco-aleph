export default function workerFactory(inject) {
  const blob = new Blob(
    [
      "/* esm.sh - esbuild bundle(math-sum@2.0.0) es2022 production */\nfunction u(...r){let t=Array.isArray(r[0])?r[0]:r,o=0;for(let n of t)o+=n;return o}export{u as default};\n",
      typeof inject === "string" ? "\n// inject\n" + inject : "",
    ],
    { type: "application/javascript" }
  );
  return new Worker(URL.createObjectURL(blob), { type: "module" });
}