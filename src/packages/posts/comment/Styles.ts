import { Theme } from "@packages/styles";
import { Dimensions, StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width * 0.95,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    shadowOffset: { height: 1.5, width: 0 },
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
  },
  author: {
    fontWeight: "600",
    color: Theme.CORE_BLACK,
    marginBottom: 5,
    fontSize: 12,
  },
  comment: {
    color: Theme.CORE_BLACK,
    fontWeight: "400",
    marginBottom: 5,
  },
  likes: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  likesText: {
    color: Theme.GRAY_TEXT,
    fontWeight: "600",
  },
  likesIcon: {
    height: 15,
    width: 15,
    marginLeft: 5,
  },
});
