import type { Post } from "@packages/graphql";
import type { ViewStyle } from "react-native";

export interface Props {
  post: Post;
  index: number;
  style?: ViewStyle;
}
