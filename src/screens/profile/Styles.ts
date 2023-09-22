import { Theme, UtilityStyles, composeStyleSheet } from "@packages/styles";
import { Dimensions, StyleSheet } from "react-native";

const HEIGHT = Dimensions.get("screen").height - Theme.TABS_HEIGHT;

export const AVATAR_DIMENSIONS = HEIGHT * 0.15;
export const AVATAR_DIMENSIONS_SHRINK = AVATAR_DIMENSIONS * 0.45;
export const ICON_DIMENSIONS = AVATAR_DIMENSIONS * 0.7;
export const ICON_DIMENSIONS_SHRINK = ICON_DIMENSIONS * 0.45;
export const AVATAR_VIEW_HEIGHT = HEIGHT * 0.35;
export const SCROLL_VIEW_HEIGHT = HEIGHT * 0.65;
export const AVATAR_VIEW_HEIGHT_SHRINK = HEIGHT * 0.15;
export const AVATAR_SHRINK_DISTANCE =
  AVATAR_VIEW_HEIGHT - AVATAR_VIEW_HEIGHT_SHRINK;
export const AVATAR_TRANSLATE_Y =
  AVATAR_SHRINK_DISTANCE + AVATAR_DIMENSIONS / 4;
export const SCROLL_VIEW_HEIGHT_GROW =
  SCROLL_VIEW_HEIGHT + AVATAR_SHRINK_DISTANCE;
export const AVATAR_X_POSITION =
  Dimensions.get("screen").width -
  AVATAR_DIMENSIONS_SHRINK -
  Dimensions.get("screen").width * 0.1;

export const Compose = composeStyleSheet(
  StyleSheet.create({
    container: UtilityStyles.Fill,
    avatar: {
      width: "100%",
      ...UtilityStyles.Center,
      height: AVATAR_VIEW_HEIGHT,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 5,
      shadowOffset: { height: 2.5, width: 0 },
      zIndex: 2,
    },
    image: {
      height: AVATAR_DIMENSIONS,
      width: AVATAR_DIMENSIONS,
      marginBottom: AVATAR_VIEW_HEIGHT * 0.075,
    },
    username: {
      fontSize: 20,
      fontWeight: "600",
    },
    feed: {
      width: "100%",
      overflow: "hidden",
      height: SCROLL_VIEW_HEIGHT,
      maxHeight: SCROLL_VIEW_HEIGHT,
    },
  }),
);
