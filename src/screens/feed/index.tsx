import React, { Component, Fragment } from "react";
import type { ListRenderItemInfo } from "react-native";
import { Animated } from "react-native";
import { Router } from "@figliolia/rn-navigation";
import type { Post, Query, QueryFeedArgs } from "@packages/graphql";
import { graphQLRequest } from "@packages/graphql";
import { feedQuery } from "@packages/graphql/queries/feed.gql";
import { Feed as FeedState, connectFeed } from "@packages/state/Feed";
import { Authentication } from "@packages/state/Authentication";
import { PostTile } from "@packages/components/post-tile";
import { AddPost } from "@packages/components/add-post";
import { connectCommentTransition } from "@packages/state/CommentTransition";
import { basicInterpolator } from "@packages/styles";
import { Styles } from "./Styles";

interface State {
  error: string;
  loading: boolean;
  startIndex: number;
}

interface Props {
  Y: number;
  feed: Post[];
  index: number;
}

class FeedComponent extends Component<Props, State> {
  state: State;
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
    void this.fetchFeed();
    if (Router.lastRoute === "comments") {
      this.animator.setValue(1);
      void this.transition(0);
      this.activePostAnimator.setValue(0);
    }
  }

  public override componentDidUpdate(pp: Props) {
    if (this.props.index !== pp.index && this.props.index !== -1) {
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
            index === this.props.index
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

  render() {
    const { feed } = this.props;
    return (
      <Fragment>
        <Animated.FlatList
          data={feed}
          renderItem={this.renderItem}
          contentContainerStyle={Styles.itemContainer}
          style={[
            Styles.scrollView,
            {
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
      </Fragment>
    );
  }
}

export const Feed = connectCommentTransition(({ index, Y }) => ({
  Y,
  index,
}))(connectFeed(({ feed }) => ({ feed }))(FeedComponent));
