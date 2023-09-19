import { UtilityStyles } from "@packages/styles";
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  scrollView: {
    width: "100%",
  },
  itemContainer: {
    width: "100%",
    ...UtilityStyles.Center,
  },
});
