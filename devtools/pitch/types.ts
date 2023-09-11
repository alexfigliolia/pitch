export type Executor = () => any | Promise<any>;

export interface IFlag {
  name: string;
  description: string;
  exec: Executor;
}

export interface RegisteredCommand {
  name: string;
  package: string;
}

export type CommandTable = Record<string, RegisteredCommand>;
