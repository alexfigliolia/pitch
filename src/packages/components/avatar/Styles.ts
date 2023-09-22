import { UtilityStyles } from "@packages/styles";
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    objectFit: "cover",
    borderRadius: 300,
    borderColor: "#fff",
    borderWidth: 3,
    borderStyle: "solid",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { height: 2.5, width: 0 },
    ...UtilityStyles.Center,
    backgroundColor: "#ebe014",
  },
  batman: {
    height: "75%",
    width: "75%",
  },
});
