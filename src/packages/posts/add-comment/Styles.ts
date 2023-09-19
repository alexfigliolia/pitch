import { Theme } from "@packages/styles";
import { Dimensions, StyleSheet } from "react-native";

const MIN_HEIGHT = Math.max(Dimensions.get("screen").height * 0.025, 35);
const SUBMIT_SIZE = MIN_HEIGHT - 10;
const SUBMIT_ICON_SIZE = SUBMIT_SIZE * 0.8;

export const Styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    minHeight: MIN_HEIGHT,
    borderRadius: MIN_HEIGHT / 2,
    flexDirection: "row",
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    shadowOffset: { height: 1.5, width: 0 },
  },
  input: {
    flex: 1,
    minHeight: MIN_HEIGHT,
    backgroundColor: "transparent",
    maxHeight: Dimensions.get("screen").height * 0.1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 10,
  },
  submit: {
    height: SUBMIT_SIZE,
    width: SUBMIT_SIZE,
    minWidth: SUBMIT_SIZE,
    borderRadius: MIN_HEIGHT,
    backgroundColor: Theme.CORE_BLUE,
    position: "relative",
    bottom: 5,
    right: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    shadowOffset: { height: 1.5, width: 0 },
  },
  up: {
    height: SUBMIT_ICON_SIZE,
    width: SUBMIT_ICON_SIZE,
  },
});
