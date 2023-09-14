import { Theme } from "@packages/styles";
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    right: 10,
    bottom: 10,
    height: 50,
    width: 50,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { height: 2.5, width: 0 },
    backgroundColor: Theme.CORE_BLUE,
  },
  icon: {
    height: "80%",
    width: "80%",
  },
});
