import { writeFileSync } from "fs";
import path from "path";
import { promisify } from "util";
import { exec } from "child_process";

export class CodeGen {
  private static execute = promisify(exec);

  public static async run() {
    await this.getSchema();
    await this.generateTypes();
    this.fixEntryPoint();
    await this.lint();
  }

  private static getSchema() {
    return this.execute(
      `npx -p @apollo/rover rover graph introspect http://localhost:4000 --output ${this.schemaPath}`,
    );
  }

  private static generateTypes() {
    return this.execute(`graphql-codegen`);
  }

  private static fixEntryPoint() {
    writeFileSync(
      this.typesEntrypoint,
      [
        'export * from "./fragment-masking";',
        'export * from "./gql";',
        'export * from "./graphql";',
      ].join("\n"),
    );
  }

  private static lint() {
    return this.execute(
      `npx eslint --fix --ext .ts src/packages/graphql/types`,
    );
  }

  private static get schemaPath() {
    return path.resolve(
      process.cwd(),
      "src/packages/graphql/types/graphql-schema.graphql",
    );
  }

  private static get typesEntrypoint() {
    return path.resolve(process.cwd(), "src/packages/graphql/types/index.ts");
  }
}
