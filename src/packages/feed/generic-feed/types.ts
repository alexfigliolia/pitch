import type { ReactElement } from "react";
import type {
  StyleProp,
  ViewStyle,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import type { EventEmitter } from "@figliolia/event-emitter";
import type { Post } from "@packages/graphql";
import type { IFeedStream } from "@screens/feed/types";

export interface Props {
  feed: Post[];
  header?: ReactElement;
  style?: StyleProp<ViewStyle>;
  onLike: (post: Post) => void;
  onUnlike: (post: Post) => void;
  stream: EventEmitter<IFeedStream>;
  postStyle?: (info: ListRenderItemInfo<Post>) => ViewStyle;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}
