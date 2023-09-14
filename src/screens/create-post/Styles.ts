import { Theme, UtilityStyles } from "@packages/styles";
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    ...UtilityStyles.Fill,
    alignItems: "center",
    position: "relative",
  },
  content: {
    width: "90%",
    flexDirection: "column",
  },
  text: {
    fontSize: 25,
    marginTop: 20,
    marginBottom: 20,
    color: Theme.CORE_BLACK,
    fontWeight: "700",
  },
});
