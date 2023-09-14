import { Theme, UtilityStyles } from "@packages/styles";
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 20,
    ...UtilityStyles.Shadow,
  },
  tags: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  active: {
    marginBottom: 20,
  },
  tag: {
    borderRadius: 30,
    backgroundColor: Theme.CORE_BLUE,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    shadowOffset: { height: 1.5, width: 0 },
    position: "relative",
    overflow: "hidden",
  },
  touchable: {
    padding: 10,
    ...UtilityStyles.Center,
  },
  delete: {
    ...UtilityStyles.Center,
    position: "absolute",
    top: 10,
    left: 10,
    height: "100%",
    width: "100%",
  },
  xIcon: {
    height: 20,
    width: 20,
  },
  tagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  editor: {
    width: "100%",
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "transparent",
    borderStyle: "solid",
    backgroundColor: "#fff",
  },
  focused: {
    borderColor: Theme.CORE_ORANGE,
  },
  input: {
    width: "100%",
    height: 45,
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    color: Theme.CORE_BLACK,
    borderRadius: 5,
  },
});
