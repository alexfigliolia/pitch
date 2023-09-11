import path from "path";
import { existsSync } from "fs";
import chalk from "chalk";
import { readFile, stat, readdir } from "fs/promises";
import type { CommandTable } from "./types";

export class Commands {
  public static ROOT = path.resolve(process.cwd(), "devtools");

  public static sayHi(message = "") {
    console.log(chalk.blueBright.bold("Pitch CLI:"), message);
  }

  public static async listAll() {
    this.sayHi("Retrieving available commands");
    const allCommands = await this.extractAll();
    console.log("\n");
    let i = 0;
    for (const command in allCommands) {
      console.log(
        `${" ".repeat(3)}${i + 1}. ${chalk.blueBright.bold(command)}`,
      );
      i++;
    }
    console.log("\n");
    return allCommands;
  }

  public static async extractAll() {
    const tools = await readdir(this.ROOT);
    const list: CommandTable = {};
    await Promise.all(tools.map(tool => this.cachePackageCommands(tool, list)));
    return list;
  }

  private static async cachePackageCommands(
    pkg: string,
    list: CommandTable = {},
  ) {
    const exposedCommands = await this.findPackageCommands(pkg);
    for (const command in exposedCommands) {
      list[`${pkg} ${command}`] = {
        name: command,
        package: pkg,
      };
    }
    return list;
  }

  public static async findPackageCommands(pkg: string) {
    const absPath = path.join(this.ROOT, pkg);
    if (
      !(await stat(absPath)).isDirectory() ||
      !existsSync(path.join(absPath, "commands.json"))
    ) {
      return {};
    }
    return this.readPublicCommands(path.join(absPath, "commands.json"));
  }

  private static async readPublicCommands(route: string) {
    const buffer = await readFile(route);
    return JSON.parse(buffer.toString()) as Record<string, string>;
  }
}
