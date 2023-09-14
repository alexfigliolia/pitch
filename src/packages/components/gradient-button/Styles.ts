import { UtilityStyles } from "@packages/styles";
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  button: {
    width: "50%",
    height: 50,
    marginTop: 20,
    borderRadius: 50,
    ...UtilityStyles.Center,
    ...UtilityStyles.Shadow,
  },
  buttonInner: {
    ...UtilityStyles.Fill,
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});
