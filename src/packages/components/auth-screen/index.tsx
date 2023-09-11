import React from "react";
import type { FC, ReactNode } from "react";
import {
  View,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Styles } from "./Styles";
import { DeviceInfo } from "@packages/device";

export const AuthScreen: FC<{ children: ReactNode }> = ({ children }) => {
  const getImage = () => {
    if (DeviceInfo.isTablet) {
      return require("@packages/public/images/login-large.webp");
    }
    return require("@packages/public/images/login-small.webp");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={Styles.fill}>
      <ImageBackground source={getImage()} style={Styles.fill}>
        <TouchableWithoutFeedback
          style={Styles.fill}
          onPress={Keyboard.dismiss}>
          <View style={Styles.content}>{children}</View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
