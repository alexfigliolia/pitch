import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "@screens/login";
import { SignUp } from "@screens/signup";
import { App } from "@screens/app";

const Stack = createNativeStackNavigator();

export class Router extends Component {
  static ScreenProps = {
    headerShown: false,
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="app">
          <Stack.Screen
            name="app"
            component={App}
            options={Router.ScreenProps}
          />
          <Stack.Screen
            name="login"
            component={Login}
            options={Router.ScreenProps}
          />
          <Stack.Screen
            name="sign-up"
            component={SignUp}
            options={Router.ScreenProps}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
