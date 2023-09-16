import { StyleSheet } from "react-native";
import { Theme } from "@packages/styles";

export const Styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    height: Theme.TABS_HEIGHT,
    minHeight: Theme.TABS_HEIGHT,
    justifyContent: "flex-start",
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    shadowOffset: { width: 0, height: -1.5 },
  },
});
