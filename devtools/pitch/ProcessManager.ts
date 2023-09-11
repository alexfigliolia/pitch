import chalk from "chalk";
import { Flag } from "./Flag";
import { spawn } from "child_process";
import { Commands } from "./Commands";

export class ProcessManager extends Commands {
  static args = new Set<string>();
  static helpFlag = new Flag({
    name: "help",
    exec: () => this.help(),
    description: `Lists all available ${chalk.blueBright.bold(
      "Pitch",
    )} options`,
  });
  static listFlag = new Flag({
    name: "list",
    exec: () => this.listAll(),
    description: `Lists all commands available in the ${chalk.blueBright.bold(
      "devtools",
    )} workspace`,
  });
  static execFlag = new Flag({
    name: "exec",
    exec: () => this.executePackageCommand(),
    description: `Executes a command registered in the ${chalk.blueBright.bold(
      "devtools",
    )} workspace`,
  });
  static flags = [this.helpFlag, this.listFlag, this.execFlag];

  public static exec() {
    this.args = new Set(process.argv.slice());
    for (const flag of this.flags) {
      if (this.args.has(flag.flag) || this.args.has(flag.abbrev)) {
        return flag.exec();
      }
    }
    this.sayHi("No flag specified");
    this.help();
  }

  private static async executePackageCommand() {
    const [pkg, command, ...args] = process.argv.slice(this.execIndex + 1);
    const availableCommands = await this.findPackageCommands(pkg);
    if (!(command in availableCommands)) {
      return this.sayHi(
        `The command ${chalk.blueBright.bold(
          `"${command}"`,
        )} is not exposed by ${chalk.blueBright.bold(`"${pkg}"`)}`,
      );
    }
    const [root, ...childArgs] = availableCommands[command].split(" ");
    const flags = childArgs.concat(args);
    this.sayHi(
      `Running ${chalk.blueBright.bold(`${pkg} ${command} ${args.join(" ")}`)}`,
    );
    const CP = spawn(root, flags, {
      stdio: "inherit",
    });

    return new Promise<void>(resolve => {
      CP.on("exit", () => {
        resolve();
      });
    });
  }

  private static help() {
    this.sayHi("Available Options:");
    console.log("\n");
    let i = 0;
    for (const flag of this.flags) {
      console.log(
        `${" ".repeat(3)}${i + 1}. ${chalk.blueBright.bold(
          flag.name,
        )} (${chalk.blueBright(flag.flag)} | ${chalk.blueBright(
          flag.abbrev,
        )}): ${flag.description}`,
      );
      i++;
    }
    throw "";
  }

  private static get execIndex() {
    let index = -1;
    for (const arg of process.argv) {
      index++;
      if (arg === this.execFlag.flag || arg === this.execFlag.abbrev) {
        return index;
      }
    }
    return -1;
  }
}
