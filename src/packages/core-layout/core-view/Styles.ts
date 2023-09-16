import { UtilityStyles, composeStyleSheet } from "@packages/styles";
import { StyleSheet } from "react-native";

export const Compose = composeStyleSheet(
  StyleSheet.create({
    view: {
      ...UtilityStyles.Fill,
      position: "relative",
      alignItems: "flex-start",
    },
    safeArea: {
      width: "100%",
    },
    frame: {
      height: "100%",
      maxHeight: "100%",
      width: "100%",
    },
  }),
);
