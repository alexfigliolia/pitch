import { UtilityStyles } from "@packages/styles";
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
  },
  inner: {
    ...UtilityStyles.Fill,
    ...UtilityStyles.Center,
  },
});
