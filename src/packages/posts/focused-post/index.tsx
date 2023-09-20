import React, { Component } from "react";
import { Animated, Dimensions, Keyboard, LayoutAnimation } from "react-native";
import { Router } from "@figliolia/rn-navigation";
import type { WithSafeAreaInsetsProps } from "react-native-safe-area-context";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { PostTile } from "@packages/components/post-tile";
import {
  CommentTransition,
  connectCommentTransition,
} from "@packages/state/CommentTransition";
import { CloseButton } from "@packages/components/close-button";
import { Theme, basicInterpolator } from "@packages/styles";
import type { ITransitionState } from "@packages/models/types";
import type { Post } from "@packages/graphql";
import { Styles } from "./Styles";

interface Props extends ITransitionState, WithSafeAreaInsetsProps {
  post: Post;
}
interface State {
  titleFontSize: number;
  descriptionFontSize: number;
}

export class FocusedPostComponent extends Component<Props, State> {
  private postAnimator = new Animated.Value(0);
  private buttonAnimator = new Animated.Value(0);
  public state = { titleFontSize: 14, descriptionFontSize: 12 };

  public override componentDidMount() {
    Router.registerExitTransition(this.reverse);
    const duration = Math.max(400, this.props.Y);
    Animated.sequence([
      Animated.timing(this.postAnimator, {
        duration,
        toValue: 1,
        delay: 200,
        useNativeDriver: false,
      }),
      Animated.timing(this.buttonAnimator, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({
        titleFontSize: 16,
        descriptionFontSize: 14,
      });
    }, 200 + duration * 0.25);
  }

  private navigate = () => {
    Router.navigate("feed");
  };

  private reverse = () => {
    return new Promise<void>(resolve => {
      Keyboard.dismiss();
      const duration = Math.max(400, this.props.Y);
      Animated.parallel([
        Animated.timing(this.postAnimator, {
          toValue: 0,
          delay: 400,
          duration,
          useNativeDriver: false,
        }),
        Animated.timing(this.buttonAnimator, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => {
        CommentTransition.resetIndex();
        setTimeout(resolve, 10);
      });
      setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        this.setState({
          titleFontSize: 14,
          descriptionFontSize: 12,
        });
      }, 400);
    });
  };

  render() {
    const { X, Y, height, postIndex, insets, post } = this.props;
    const { titleFontSize, descriptionFontSize } = this.state;
    return (
      <Animated.View
        style={[
          Styles.container,
          {
            width: this.postAnimator.interpolate({
              inputRange: [0, 1],
              outputRange: [
                Dimensions.get("screen").width * 0.9,
                Dimensions.get("screen").width,
              ],
            }),
            height: this.postAnimator.interpolate({
              inputRange: [0, 1],
              outputRange: [height, height * 1.3 + insets.top],
            }),
            borderRadius: this.postAnimator.interpolate({
              inputRange: [0, 1],
              outputRange: [5, 0],
            }),
            transform: [
              {
                translateY: this.postAnimator.interpolate({
                  inputRange: [0, 1],
                  outputRange: [Y, 0],
                }),
              },
              {
                translateX: this.postAnimator.interpolate({
                  inputRange: [0, 1],
                  outputRange: [insets.left + X, 0],
                }),
              },
            ],
          },
        ]}>
        <PostTile
          post={post}
          index={postIndex}
          style={Styles.post}
          titleStyle={{ fontSize: titleFontSize }}
          descriptionStyle={{ fontSize: descriptionFontSize }}
        />
        <CloseButton
          onPress={this.navigate}
          iconColor={Theme.GRAY_TEXT}
          style={[
            Styles.closeButton,
            {
              top: insets.top + height * 0.3,
              transform: [
                {
                  scale: basicInterpolator(this.buttonAnimator),
                },
              ],
            },
          ]}
        />
      </Animated.View>
    );
  }
}

export const FocusedPost = withSafeAreaInsets(
  connectCommentTransition(({ X, Y, postIndex, height, post }) => ({
    X,
    Y,
    post,
    height,
    postIndex,
  }))(FocusedPostComponent),
);
