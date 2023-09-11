#! /usr/bin/env ts-node
import { ProcessManager } from "./ProcessManager";

(async () => {
  await ProcessManager.exec();
})().catch(console.log);
