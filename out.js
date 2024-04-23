// editor.ts
import { editor, Uri } from "https://esm.sh/monaco-editor@0.36.1";
self.MonacoEnvironment = {
  async getWorker(_, label) {
    if (label === "typescript" || label === "javascript") {
      const { default: tsWorker } = await import("https://esm.sh/monaco-editor@0.36.1/esm/vs/language/typescript/ts.worker?worker");
      return tsWorker();
    }
    const { default: editorWorker } = await import("https://esm.sh/monaco-editor@0.36.1/esm/vs/editor/editor.worker?worker");
    return editorWorker();
  }
};
function createModel(name, source) {
  const lang = getLanguage(name);
  if (!lang) {
    return null;
  }
  const uri = Uri.parse(`file:///src/${name}`);
  const model2 = editor.createModel(source, lang, uri);
  return model2;
}
function createEditor(container, readOnly) {
  return editor.create(container, {
    readOnly,
    automaticLayout: true,
    contextmenu: true,
    fontSize: 14,
    lineHeight: 18,
    lineNumbersMinChars: 2,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    scrollbar: {
      useShadows: false,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10
    },
    overviewRulerLanes: 0
  });
}
function getLanguage(name) {
  switch (name.slice(name.lastIndexOf(".") + 1).toLowerCase()) {
    case "ts":
    case "tsx":
      return "typescript";
    case "js":
    case "jsx":
      return "javascript";
  }
  return null;
}

// main.ts
var el = document.querySelector(".editor");
var editor2 = createEditor(el);
var model = createModel("mod.ts", `// Monaco Editor x Aleph.js (SPA mode) 

console.log("Hello, world!");
`);
el.innerHTML = "";
editor2.setModel(model);
