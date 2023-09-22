import type { Post } from "@packages/graphql";
import type { Animated } from "react-native";
import type { WithSafeAreaInsetsProps } from "react-native-safe-area-context";

export interface State {
  error: string;
  loading: boolean;
  startIndex: number;
}

export interface Props extends WithSafeAreaInsetsProps {
  Y: number;
  feed: Post[];
  postIndex: number;
}

export type IFeedStream = {
  "scroll-to": ScrollParams;
};

export type ScrollParams = Parameters<Animated.FlatList["scrollToOffset"]>[0];
