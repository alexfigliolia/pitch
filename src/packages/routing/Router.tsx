import React, { Component } from "react";
import { Router as NativeRouter } from "@figliolia/rn-navigation";
import { Login } from "@screens/login";
import { SignUp } from "@screens/signup";
import { App } from "@screens/app";
import { View } from "react-native";
import { Styles } from "./Styles";
import { SafeAreaProvider } from "react-native-safe-area-context";

export class Router extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <View style={Styles.app}>
          <NativeRouter
            defaultRoute="app"
            routes={[
              { name: "app", component: App },
              { name: "login", component: Login },
              { name: "sign-up", component: SignUp },
            ]}
          />
        </View>
      </SafeAreaProvider>
    );
  }
}
