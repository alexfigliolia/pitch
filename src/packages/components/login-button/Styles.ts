import { StyleSheet } from "react-native";
import { UtilityStyles } from "@packages/styles/Utilities";
import { Theme } from "@packages/styles";

export const Styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
    color: "#fff",
    ...UtilityStyles.Center,
    borderRadius: 30,
    shadowColor: "#d6d6d6",
    shadowOffset: { width: 0, height: 2.5 },
    shadowRadius: 5,
    backgroundColor: Theme.CORE_ORANGE,
  },
  loader: {
    height: 35,
    maxHeight: 35,
    width: 35,
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
