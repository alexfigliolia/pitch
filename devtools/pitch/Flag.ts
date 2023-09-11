import type { Executor, IFlag } from "./types";

export class Flag {
  public name: string;
  public flag: string;
  public abbrev: string;
  public description: string;
  public exec: Executor;
  constructor({ name, description, exec }: IFlag) {
    this.name = name;
    this.flag = `--${name}`;
    this.abbrev = `-${name.slice(0, 1)}`;
    this.description = description;
    this.exec = exec;
  }

  public match(specifier: string) {
    return specifier === this.flag || specifier === this.abbrev;
  }
}
