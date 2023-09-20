import React from "react";
import type { FC, ReactNode } from "react";
import { View } from "react-native";
import { Styles } from "./Styles";

export const CoreView: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <View style={Styles.view}>
      <View style={Styles.frame}>{children}</View>
    </View>
  );
};
