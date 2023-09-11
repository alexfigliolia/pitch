import { StyleSheet } from "react-native";
import { UtilityStyles } from "@packages/styles/Utilities";

export const Styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 25,
    height: 45,
    border: "3.5px solid #fff;",
    borderWidth: 3.5,
    borderStyle: "solid",
    borderColor: "#fff",
    shadowColor: "#d6d6d6",
    shadowOffset: { width: 0, height: 2.5 },
    shadowRadius: 5,
    ...UtilityStyles.Center,
    boxSizing: "border-box",
  },
  valid: {
    borderColor: "rgb(255, 179, 97)",
  },
  input: {
    width: "90%",
    height: 45,
    color: "#000",
    fontSize: 17,
  },
  state: {
    position: "absolute",
    top: 5,
    right: 4,
    height: 30,
    width: 30,
    ...UtilityStyles.Center,
  },
});
