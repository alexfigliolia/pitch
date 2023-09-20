import React, { Component } from "react";
import type {
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Animated, View, Dimensions } from "react-native";
import type { WithSafeAreaInsetsProps } from "react-native-safe-area-context";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { Router } from "@figliolia/rn-navigation";
import type { Post, Query, QueryFeedArgs } from "@packages/graphql";
import { graphQLRequest } from "@packages/graphql";
import { feedQuery } from "@packages/graphql/queries/feed.gql";
import { Feed as FeedState, connectFeed } from "@packages/state/Feed";
import { Authentication } from "@packages/state/Authentication";
import { PostTile } from "@packages/components/post-tile";
import { AddPost } from "@packages/components/add-post";
import { connectCommentTransition } from "@packages/state/CommentTransition";
import { Theme, basicInterpolator } from "@packages/styles";
import { Styles } from "./Styles";

interface State {
  error: string;
  loading: boolean;
  startIndex: number;
}

interface Props extends WithSafeAreaInsetsProps {
  Y: number;
  feed: Post[];
  postIndex: number;
}

class FeedComponent extends Component<Props, State> {
  state: State;
  private static scrollPosition = 0;
  private FlatList?: Animated.FlatList;
  private animator = new Animated.Value(0);
  private activePostAnimator = new Animated.Value(1);
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
    if (Router.lastRoute === "comments") {
      this.animator.setValue(1);
      void this.transition(0);
      this.activePostAnimator.setValue(0);
      setTimeout(() => {
        if (this.FlatList) {
          this.FlatList.scrollToOffset({
            animated: false,
            offset: FeedComponent.scrollPosition,
          });
        }
      }, 0);
    } else {
      void this.fetchFeed();
    }
  }

  public override componentDidUpdate(pp: Props) {
    if (this.props.postIndex !== pp.postIndex && this.props.postIndex !== -1) {
      this.transitionActivePost(0);
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

  private renderItem = ({ index, item }: ListRenderItemInfo<Post>) => {
    return (
      <PostTile
        post={item}
        index={index}
        style={{
          opacity:
            index === this.props.postIndex
              ? basicInterpolator(this.activePostAnimator)
              : 1,
        }}
      />
    );
  };

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

  private transitionActivePost(toValue: 0 | 1) {
    Animated.timing(this.activePostAnimator, {
      toValue,
      delay: 500,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  private cacheReference = (c: Animated.FlatList) => {
    this.FlatList = c;
  };

  private cacheScrollPosition = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    FeedComponent.scrollPosition = e.nativeEvent.contentOffset.y;
  };

  render() {
    const { feed, insets } = this.props;
    const viewHeight =
      Dimensions.get("screen").height - (insets.top + Theme.TABS_HEIGHT);
    return (
      <View style={Styles.container}>
        <Animated.FlatList
          data={feed}
          ref={this.cacheReference}
          renderItem={this.renderItem}
          onMomentumScrollEnd={this.cacheScrollPosition}
          contentContainerStyle={Styles.itemContainer}
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
          ]}
        />
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
