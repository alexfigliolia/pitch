import { StyleSheet } from "react-native";

export const UtilityStyles = StyleSheet.create({
  Center: {
    justifyContent: "center",
    alignItems: "center",
  },
  Fill: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  Overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  Shadow: {
    shadowOpacity: 0.2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2.5 },
    shadowRadius: 5,
  },
});
