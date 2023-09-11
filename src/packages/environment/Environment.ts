import Config from "react-native-config";

export class Environment {
  static GQL_URL = Config.GQL_URL || "http://localhost:4000/graphql";
}
