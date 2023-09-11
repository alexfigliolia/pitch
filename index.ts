import { AppRegistry } from "react-native";
import { Router } from "./src/packages/routing";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => Router);
