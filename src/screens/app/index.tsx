import React, { Component } from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feed } from "@screens/feed";
import { AuthenticatedRoute } from "@packages/components/authenticated-route";
import { Styles } from "./Styles";
import { CreatePost } from "@screens/create-post";
import { Settings } from "@screens/settings";
import { CoreTabs } from "@packages/core-layout/core-tabs";

const Stack = createNativeStackNavigator();

export class App extends Component {
  static ScreenProps = {
    headerShown: false,
  };

  render() {
    return (
      <AuthenticatedRoute redirect="sign-up">
        <View style={Styles.container}>
          <Stack.Navigator initialRouteName="feed">
            <Stack.Screen
              name="feed"
              component={Feed}
              options={App.ScreenProps}
            />
            <Stack.Screen
              name="profile"
              component={Settings}
              options={App.ScreenProps}
            />
            <Stack.Screen
              name="settings"
              component={Settings}
              options={App.ScreenProps}
            />
            <Stack.Screen
              name="create-post"
              component={CreatePost}
              options={App.ScreenProps}
            />
          </Stack.Navigator>
          <CoreTabs />
        </View>
      </AuthenticatedRoute>
    );
  }
}
