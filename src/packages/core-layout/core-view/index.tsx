import React, { useRef } from "react";
import type { FC, ReactNode } from "react";
import { Dimensions, View } from "react-native";
import { Compose } from "./Styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Theme } from "@packages/styles";

export const CoreView: FC<{ children: ReactNode }> = ({ children }) => {
  const offset = useSafeAreaInsets();
  const Styles = useRef(
    Compose({
      safeArea: {
        minHeight: offset.top,
      },
      frame: {
        maxHeight:
          Dimensions.get("screen").height - (offset.top + Theme.TABS_HEIGHT),
      },
    }),
  );
  return (
    <View style={Styles.current.view}>
      <View style={Styles.current.safeArea} />
      <View style={Styles.current.frame}>{children}</View>
    </View>
  );
};
