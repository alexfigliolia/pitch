import { UtilityStyles } from "@packages/styles/Utilities";
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  fill: {
    ...UtilityStyles.Fill,
    ...UtilityStyles.Center,
  },
  content: {
    width: "90%",
    flexDirection: "column",
  },
});
