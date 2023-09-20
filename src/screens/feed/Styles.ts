import { UtilityStyles } from "@packages/styles";
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    ...UtilityStyles.Fill,
    justifyContent: "flex-end",
  },
  scrollView: {
    width: "100%",
    overflow: "visible",
  },
  itemContainer: {
    ...UtilityStyles.Center,
    width: "100%",
  },
});
