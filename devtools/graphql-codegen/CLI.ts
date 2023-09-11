import { CodeGen } from "./CodeGen";

(async () => {
  await CodeGen.run();
})().catch(console.log);
