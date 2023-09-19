import { Theme, UtilityStyles } from "@packages/styles";
import { Dimensions, StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width * 0.9,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    shadowOffset: { height: 2.5, width: 0 },
    ...UtilityStyles.Center,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
  },
  content: {
    width: "90%",
  },
  title: {
    width: "100%",
  },
  titleText: {
    fontSize: 14,
    fontWeight: "600",
    color: Theme.CORE_BLACK,
  },
  description: {
    width: "100%",
    marginBottom: 5,
    marginTop: 5,
  },
  descriptionText: {
    fontSize: 12,
    fontWeight: "400",
    color: Theme.LIGHT_BLACK,
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    marginTop: 15,
  },
  footerAction: {
    flexDirection: "row",
    ...UtilityStyles.Center,
  },
  actionIcon: {
    height: 20,
    width: 20,
    marginLeft: 5,
  },
  actionText: {
    color: Theme.GRAY_TEXT,
    fontSize: 14,
    fontWeight: "600",
  },
});
