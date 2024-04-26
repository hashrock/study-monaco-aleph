import { createEditor, createModel } from "./editor.ts";

const el = document.querySelector(".editor");
const editor = createEditor(el as HTMLElement);

const script = `function App() {
  return <div>Hello, world!</div>;
}
`

const model = createModel("mod.tsx", script);

el!.innerHTML = "";
editor.setModel(model);
