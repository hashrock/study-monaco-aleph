import { editor, Uri } from "monaco-editor";
// import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker";
// import editorWorker from "monaco-editor/esm/vs/editor/editor.worker";
import tsWorker from "./vs/language/typescript/ts.worker.js";
import editorWorker from "./vs/editor/editor.worker.js";
// import "https://esm.sh/monaco-editor?css";

// deno-lint-ignore ban-ts-comment
// @ts-ignore
// self.MonacoEnvironment = {
//   async getWorker(_: unknown, label: string) {
//     if (label === "typescript" || label === "javascript") {
//       // const { default: tsWorker } = await import(
//       //   "https://esm.sh/monaco-editor/esm/vs/language/typescript/ts.worker?worker"
//       // );
//       return tsWorker();
//     }
//     // const { default: editorWorker } = await import(
//     //   "https://esm.sh/monaco-editor/esm/vs/editor/editor.worker?worker"
//     // );
//     return editorWorker();
//   },
// };
self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		if (label === 'typescript' || label === 'javascript') {
			return './vs/language/typescript/ts.worker.js';
		}
		return './vs/editor/editor.worker.js';
	}
};


export function createModel(name: string, source: string) {
  const lang = getLanguage(name);
  if (!lang) {
    return null;
  }

  const uri = Uri.parse(`file:///src/${name}`);
  const model = editor.createModel(source, lang, uri);
  return model;
}

export function createEditor(container: HTMLElement, readOnly?: boolean) {
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
      horizontalScrollbarSize: 10,
    },
    overviewRulerLanes: 0,
  });
}

function getLanguage(name: string) {
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
