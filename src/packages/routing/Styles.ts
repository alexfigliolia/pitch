import { Theme, UtilityStyles } from "@packages/styles";
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  app: {
    ...UtilityStyles.Fill,
    backgroundColor: Theme.BACKGROUND_GRAY,
  },
});
