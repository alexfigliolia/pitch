import React, { Component } from "react";
import type {
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Animated, View, Dimensions } from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { Router } from "@figliolia/rn-navigation";
import { EventEmitter } from "@figliolia/event-emitter";
import type { Post, Query, QueryFeedArgs } from "@packages/graphql";
import { graphQLRequest } from "@packages/graphql";
import { feedQuery } from "@packages/graphql/queries/feed.gql";
import { Feed as FeedState, connectFeed } from "@packages/state/Feed";
import { Authentication } from "@packages/state/Authentication";
import { AddPost } from "@packages/components/add-post";
import { connectCommentTransition } from "@packages/state/CommentTransition";
import { Theme, basicInterpolator } from "@packages/styles";
import { GenericFeed } from "@packages/feed";
import { ProfileFeed } from "@packages/state/ProfileFeed";
import type { IFeedStream, Props, State } from "./types";
import { Styles } from "./Styles";

class FeedComponent extends Component<Props, State> {
  state: State;
  private static scrollPosition = 0;
  private animator = new Animated.Value(0);
  private activePostAnimator = new Animated.Value(1);
  private FeedStream = new EventEmitter<IFeedStream>();
  constructor(props: Props) {
    super(props);
    this.state = { startIndex: 0, error: "", loading: true };
    Router.registerExitTransition(() => {
      if (Router.currentRoute === "comments") {
        return this.transition(1);
      }
    });
  }

  public override componentDidMount() {
    if (Router.lastRoute !== "comments") {
      void this.fetchFeed();
    } else {
      this.animator.setValue(1);
      void this.transition(0);
      this.activePostAnimator.setValue(0);
      this.FeedStream.emit("scroll-to", {
        animated: false,
        offset: FeedComponent.scrollPosition,
      });
    }
  }

  public override componentDidUpdate(pp: Props) {
    if (this.props.postIndex !== pp.postIndex && this.props.postIndex !== -1) {
      this.activePostAnimator.setValue(0);
    }
  }

  private async fetchFeed(startIndex = 0) {
    try {
      const response = await graphQLRequest<Pick<Query, "feed">, QueryFeedArgs>(
        {
          query: feedQuery,
          variables: {
            startIndex,
            id: Authentication.getState().id,
          },
        },
      );
      FeedState.setFeed(response.data.feed);
      this.setState({ loading: false });
    } catch (error: any) {
      this.setState({ error: error.message, loading: false });
    }
  }

  private transition(toValue: 1 | 0 = 1) {
    return new Promise<void>(resolve => {
      Animated.timing(this.animator, {
        toValue,
        duration: 500,
        useNativeDriver: true,
        delay: toValue === 0 ? 500 : 0,
      }).start(() => {
        resolve();
      });
    });
  }

  private postStyle = ({ index }: ListRenderItemInfo<Post>) => {
    return {
      opacity:
        index === this.props.postIndex
          ? basicInterpolator(this.activePostAnimator)
          : 1,
    };
  };

  private cacheScrollPosition = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    FeedComponent.scrollPosition = e.nativeEvent.contentOffset.y;
  };

  private onLike = (post: Post) => {
    FeedState.likePost(post.id, 1);
    ProfileFeed.likePost(post.id, 1);
  };

  private onUnlike = (post: Post) => {
    FeedState.likePost(post.id, -1);
    ProfileFeed.likePost(post.id, -1);
  };

  render() {
    const { feed, insets } = this.props;
    const viewHeight =
      Dimensions.get("screen").height - (insets.top + Theme.TABS_HEIGHT);
    return (
      <View style={Styles.container}>
        <Animated.View
          style={[
            Styles.scrollView,
            {
              height: viewHeight,
              maxHeight: viewHeight,
              opacity: this.animator.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
              transform: [
                {
                  scale: this.animator.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.75],
                  }),
                },
              ],
            },
          ]}>
          <GenericFeed
            feed={feed}
            onLike={this.onLike}
            stream={this.FeedStream}
            onUnlike={this.onUnlike}
            postStyle={this.postStyle}
            onScrollEnd={this.cacheScrollPosition}
          />
        </Animated.View>
        <AddPost />
      </View>
    );
  }
}

export const Feed = withSafeAreaInsets(
  connectCommentTransition(({ postIndex, Y }) => ({
    Y,
    postIndex,
  }))(connectFeed(({ feed }) => ({ feed }))(FeedComponent)),
);
