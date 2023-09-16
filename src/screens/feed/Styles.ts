import { UtilityStyles } from "@packages/styles";
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  scrollView: {
    ...UtilityStyles.Fill,
    overflow: "visible",
  },
  itemContainer: {
    ...UtilityStyles.Center,
    width: "100%",
  },
});
