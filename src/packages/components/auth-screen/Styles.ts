import { UtilityStyles } from "@packages/styles/Utilities";
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  fill: {
    ...UtilityStyles.Fill,
    ...UtilityStyles.Center,
  },
  content: {
    width: "90%",
    flexDirection: "column",
  },
  greeting: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 100,
    color: "#fff",
    fontFamily: "Josefin Sans",
    marginBottom: -10,
  },
  subtext: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Josefin Sans",
  },
  form: {
    width: "100%",
    flexDirection: "column",
  },
  error: {
    color: "rgb(255, 63, 63)",
    width: "100%",
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Josefin Sans",
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "800",
  },
  redirect: {
    width: "100%",
    color: "#fff",
    marginTop: 35,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  redirectReason: {
    color: "#fff",
    marginRight: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  redirectLink: {
    color: "#fff",
    marginRight: 5,
    fontSize: 16,
    fontWeight: "700",
    textDecorationLine: "underline",
    textDecorationColor: "#fff",
    textDecorationStyle: "solid",
  },
});
