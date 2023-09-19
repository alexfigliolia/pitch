import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    shadowOffset: { height: 2.5, width: 0 },
    zIndex: 10000,
  },
  post: {
    width: "100%",
    shadowColor: "transparent",
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { height: 0, width: 0 },
    marginBottom: 0,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 5,
    zIndex: 3,
  },
});
