import { Theme, UtilityStyles } from "@packages/styles";
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "40%",
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: -5 },
  },
  titleContainer: {
    height: 60,
    width: "100%",
    position: "relative",
    ...UtilityStyles.Center,
    borderBottomColor: Theme.LIGHT_GRAY,
    borderBottomWidth: 1,
    backgroundColor: Theme.DEEP_ORANGE,
  },
  closer: {
    position: "absolute",
    top: 2.5,
    right: 2.5,
    height: 30,
    width: 30,
    ...UtilityStyles.Center,
  },
  closerInner: {
    height: 22.5,
    width: 22.5,
    ...UtilityStyles.Center,
  },
  title: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "600",
  },
  scrollView: {
    ...UtilityStyles.Fill,
    flexDirection: "column",
  },
  buttonContainer: {
    width: "100%",
    height: 50,
    borderBottomColor: Theme.LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  buttonContainerSelected: {
    backgroundColor: Theme.CORE_BLUE,
  },
  buttonText: {
    color: Theme.CORE_BLACK,
    fontSize: 15,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  buttonTextSelected: {
    color: "#fff",
  },
});
