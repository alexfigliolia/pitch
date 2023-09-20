import { Theme, UtilityStyles } from "@packages/styles";
import { Dimensions, StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  view: {
    ...UtilityStyles.Fill,
    position: "relative",
    alignItems: "flex-start",
  },
  frame: {
    height: "100%",
    width: "100%",
    maxHeight: Dimensions.get("screen").height - Theme.TABS_HEIGHT,
  },
});
