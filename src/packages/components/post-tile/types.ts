import type { Post } from "@packages/graphql";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface Props {
  post: Post;
  index: number;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  onLike: (post: Post) => void;
  onUnlike: (post: Post) => void;
}
