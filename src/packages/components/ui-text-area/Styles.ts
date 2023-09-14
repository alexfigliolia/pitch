import { StyleSheet } from "react-native";
import { UtilityStyles } from "@packages/styles/Utilities";
import { Theme } from "@packages/styles";

export const Styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 5,
    border: "3.5px solid #fff;",
    borderWidth: 3.5,
    borderStyle: "solid",
    borderColor: "#fff",
    ...UtilityStyles.Shadow,
    ...UtilityStyles.Center,
    boxSizing: "border-box",
  },
  valid: {
    borderWidth: 3.5,
    borderStyle: "solid",
    borderColor: Theme.CORE_ORANGE,
  },
  input: {
    width: "90%",
    color: "#000",
    fontSize: 17,
    paddingTop: 15,
    paddingBottom: 15,
  },
});
