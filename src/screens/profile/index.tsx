import React, { Component } from "react";
import type {
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Animated } from "react-native";
import { Router } from "@figliolia/rn-navigation";
import type { WithSafeAreaInsetsProps } from "react-native-safe-area-context";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import {
  Authentication,
  connectAuthentication,
} from "@packages/state/Authentication";
import { basicInterpolator } from "@packages/styles";
import { GenericFeed } from "@packages/feed";
import type { Query, QueryProfileFeedArgs } from "@packages/graphql";
import { graphQLRequest, type Post } from "@packages/graphql";
import { connectCommentTransition } from "@packages/state/CommentTransition";
import { ProfileFeed, connectProfileFeed } from "@packages/state/ProfileFeed";
import { profileFeedQuery } from "@packages/graphql/queries/profileFeed.gql";
import {
  Compose,
  SCROLL_VIEW_HEIGHT,
  AVATAR_SHRINK_DISTANCE,
  SCROLL_VIEW_HEIGHT_GROW,
  AVATAR_VIEW_HEIGHT,
  AVATAR_VIEW_HEIGHT_SHRINK,
  AVATAR_DIMENSIONS_SHRINK,
} from "./Styles";
import { AddPost } from "@packages/components/add-post";
import { Feed } from "@packages/state/Feed";
import { Avatar } from "@packages/components/avatar";
import { JosefinText } from "@packages/components/josefin-text";

interface Props extends WithSafeAreaInsetsProps {
  feed: Post[];
  name: string;
  image: string;
  postIndex: number;
}

interface State {
  error: string;
  loading: boolean;
  startIndex: number;
}

class ProfileComponent extends Component<Props> {
  private static scrollPosition = 0;
  private FlatList?: Animated.FlatList;
  private styles: ReturnType<typeof Compose>;
  private animator = new Animated.Value(0);
  private scrollAnimator = new Animated.Value(0);
  private activePostAnimator = new Animated.Value(1);
  private HEIGHT_INTERPOLATION = this.scrollAnimator.interpolate({
    inputRange: [0, AVATAR_SHRINK_DISTANCE],
    outputRange: [SCROLL_VIEW_HEIGHT, SCROLL_VIEW_HEIGHT_GROW],
    extrapolate: "clamp",
  });
  public state: State = { startIndex: 0, error: "", loading: true };
  constructor(props: Props) {
    super(props);
    Router.registerExitTransition(() => {
      if (Router.currentRoute === "comments") {
        return this.transition(1);
      }
    });
    this.styles = Compose({
      container: {
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
      avatar: {
        height: this.scrollAnimator.interpolate({
          inputRange: [0, AVATAR_SHRINK_DISTANCE],
          outputRange: [AVATAR_VIEW_HEIGHT, AVATAR_VIEW_HEIGHT_SHRINK],
          extrapolate: "clamp",
        }),
      },
      image: {
        transform: [
          {
            scale: this.scrollAnimator.interpolate({
              inputRange: [
                AVATAR_SHRINK_DISTANCE * 0,
                AVATAR_SHRINK_DISTANCE * 1,
              ],
              outputRange: [1, 0.45],
              extrapolate: "clamp",
            }),
          },
          {
            translateY: this.scrollAnimator.interpolate({
              inputRange: [AVATAR_SHRINK_DISTANCE * 0, AVATAR_SHRINK_DISTANCE],
              outputRange: [0, AVATAR_DIMENSIONS_SHRINK / 3.5],
              extrapolate: "clamp",
            }),
          },
        ],
      },
      username: {
        marginBottom: this.props.insets.top * -0.8,
        transform: [
          {
            scale: this.scrollAnimator.interpolate({
              inputRange: [0, AVATAR_SHRINK_DISTANCE],
              outputRange: [1, 0.75],
              extrapolate: "clamp",
            }),
          },
          {
            translateY: this.scrollAnimator.interpolate({
              inputRange: [0, AVATAR_SHRINK_DISTANCE],
              outputRange: [0, -AVATAR_SHRINK_DISTANCE / 2.75],
              extrapolate: "clamp",
            }),
          },
        ],
      },
      feed: {
        height: this.HEIGHT_INTERPOLATION,
        maxHeight: this.HEIGHT_INTERPOLATION,
      },
    });
  }

  public override componentDidMount() {
    if (Router.lastRoute !== "comments") {
      void this.fetchFeed();
    } else {
      this.animator.setValue(1);
      void this.transition(0);
      this.activePostAnimator.setValue(0);
      setTimeout(() => {
        if (this.FlatList) {
          alert(ProfileComponent.scrollPosition);
          this.FlatList.scrollToOffset({
            animated: false,
            offset: ProfileComponent.scrollPosition,
          });
        }
      }, 0);
    }
  }

  public override componentDidUpdate(pp: Props) {
    if (this.props.postIndex !== pp.postIndex && this.props.postIndex !== -1) {
      this.activePostAnimator.setValue(0);
    }
  }

  private async fetchFeed(startIndex = 0) {
    try {
      const response = await graphQLRequest<
        Pick<Query, "profileFeed">,
        QueryProfileFeedArgs
      >({
        query: profileFeedQuery,
        variables: {
          startIndex,
          id: Authentication.getState().id,
        },
      });
      ProfileFeed.setFeed(response.data.profileFeed);
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
      marginTop: index === 0 ? 15 : 0,
      opacity:
        index === this.props.postIndex
          ? basicInterpolator(this.activePostAnimator)
          : 1,
    };
  };

  private cacheReference(c: Animated.FlatList) {
    this.FlatList = c;
  }

  private cacheScrollPosition = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    ProfileComponent.scrollPosition = e.nativeEvent.contentOffset.y;
  };

  private onLike = (post: Post) => {
    Feed.likePost(post.id, 1);
    ProfileFeed.likePost(post.id, 1);
  };

  private onUnlike = (post: Post) => {
    Feed.likePost(post.id, -1);
    ProfileFeed.likePost(post.id, -1);
  };

  render() {
    const { image, feed, name } = this.props;
    return (
      <Animated.View style={this.styles.container}>
        <Animated.View style={this.styles.avatar}>
          <Avatar image={image} style={this.styles.image} />
          <JosefinText style={this.styles.username}>{name}</JosefinText>
        </Animated.View>
        <Animated.View style={this.styles.feed}>
          <GenericFeed
            feed={feed}
            onLike={this.onLike}
            onUnlike={this.onUnlike}
            postStyle={this.postStyle}
            listRef={this.cacheReference}
            onScrollEnd={this.cacheScrollPosition}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollAnimator } } }],
              { useNativeDriver: false },
            )}
          />
        </Animated.View>
        <AddPost />
      </Animated.View>
    );
  }
}

export const Profile = withSafeAreaInsets(
  connectProfileFeed(({ feed }) => ({ feed }))(
    connectCommentTransition(({ postIndex }) => ({ postIndex }))(
      connectAuthentication(({ image, name }) => ({ image, name }))(
        ProfileComponent,
      ),
    ),
  ),
);
