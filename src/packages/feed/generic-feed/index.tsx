import React, { Component } from "react";
import type { ListRenderItemInfo } from "react-native";
import { Animated } from "react-native";
import type { Post } from "@packages/graphql";
import { PostTile } from "@packages/components/post-tile";
import { Styles } from "./Styles";
import type { Props } from "./types";
import type { ScrollParams } from "@screens/feed/types";

export class GenericFeed extends Component<Props> {
  private FlatList?: Animated.FlatList;
  private listenerIDs: Record<string, string> = {};
  constructor(props: Props) {
    super(props);
    this.registerListeners();
  }

  componentWillUnmount() {
    this.destroyListeners();
  }

  private registerListeners() {
    const { stream } = this.props;
    if (stream) {
      this.listenerIDs["scroll-to"] = stream.on("scroll-to", this.scrollTo);
    }
  }

  private destroyListeners() {
    const { stream } = this.props;
    if (stream) {
      stream.off("scroll-to", this.listenerIDs["scroll-to"]);
    }
  }

  private scrollTo = (params: ScrollParams) => {
    if (!this.FlatList) {
      return;
    }
    console.log("SCROLL", this.FlatList.scrollToOffset);
    this.FlatList.scrollToOffset(params);
  };

  private renderItem = ({ index, item, ...rest }: ListRenderItemInfo<Post>) => {
    const { postStyle, onLike, onUnlike } = this.props;
    return (
      <PostTile
        post={item}
        index={index}
        onLike={onLike}
        onUnlike={onUnlike}
        style={postStyle?.({ index, item, ...rest })}
      />
    );
  };

  private cacheReference = (c: Animated.FlatList) => {
    this.FlatList = c;
  };

  render() {
    const { style, feed, onScroll, onScrollEnd, header } = this.props;
    return (
      <Animated.FlatList
        data={feed}
        onScroll={onScroll}
        ref={this.cacheReference}
        ListHeaderComponent={header}
        renderItem={this.renderItem}
        onMomentumScrollEnd={onScrollEnd}
        style={[Styles.scrollView, style]}
        ListHeaderComponentStyle={Styles.header}
        contentContainerStyle={Styles.itemContainer}
      />
    );
  }
}
