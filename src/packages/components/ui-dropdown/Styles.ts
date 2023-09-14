import { Theme, UtilityStyles } from "@packages/styles";
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#fff",
    borderStyle: "solid",
    marginBottom: 20,
    ...UtilityStyles.Shadow,
  },
  focused: {
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: Theme.CORE_ORANGE,
  },
  touchable: {
    ...UtilityStyles.Fill,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
    paddingRight: 20,
  },
  placeholder: {
    textAlign: "left",
    color: Theme.LIGHT_BLACK,
    fontSize: 18,
  },
  value: {
    textAlign: "left",
    color: Theme.CORE_BLACK,
    fontSize: 18,
    textTransform: "capitalize",
  },
});
