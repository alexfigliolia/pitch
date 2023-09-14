import { UtilityStyles } from "@packages/styles";
import { Dimensions, StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  feed: {
    ...UtilityStyles.Fill,
    justifyContent: "flex-end",
  },
  scrollView: {
    height: Dimensions.get("screen").height - 175,
    width: "100%",
    overflow: "hidden",
  },
  itemContainer: {
    ...UtilityStyles.Center,
    width: "100%",
  },
});
