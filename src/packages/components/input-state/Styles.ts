import { UtilityStyles } from "@packages/styles/Utilities";
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
  error: {
    backgroundColor: "rgb(255, 69, 69)",
    borderRadius: 100000,
  },
  success: {
    backgroundColor: "rgb(53, 215, 131)",
    borderRadius: 100000,
  },
  icon: {
    position: "absolute",
    top: "2%",
    left: "5%",
    height: "90%",
    width: "90%",
    ...UtilityStyles.Center,
  },
  svg: {
    height: "80%",
    width: "80%",
  },
});
