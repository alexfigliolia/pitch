import type { FC } from "react";
import React, { useCallback, useEffect, useRef } from "react";
import { Animated, Dimensions, Keyboard } from "react-native";
import { Router } from "@figliolia/rn-navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PostTile } from "@packages/components/post-tile";
import {
  CommentTransition,
  useCommentTransition,
} from "@packages/state/CommentTransition";
import { CloseButton } from "@packages/components/close-button";
import { Theme, basicInterpolator } from "@packages/styles";
import { Styles } from "./Styles";

export const FocusedPost: FC<Record<string, never>> = () => {
  const offsets = useSafeAreaInsets();
  const postAnimator = useRef(new Animated.Value(0));
  const shadowAnimator = useRef(new Animated.Value(0));
  const buttonAnimator = useRef(new Animated.Value(0));
  const X = useCommentTransition(state => state.X);
  const Y = useCommentTransition(state => state.Y);
  const post = useCommentTransition(state => state.post);
  const index = useCommentTransition(state => state.index);
  const height = useCommentTransition(state => state.height);

  const wrap = useCallback((animation: Animated.CompositeAnimation) => {
    return new Promise<void>(resolve => {
      animation.start(() => {
        resolve();
      });
    });
  }, []);

  const reverse = useCallback(() => {
    return new Promise<void>(resolve => {
      Keyboard.dismiss();
      const duration = Math.max(400, Y);
      void Promise.all([
        wrap(
          Animated.timing(postAnimator.current, {
            toValue: 0,
            delay: 400,
            duration,
            useNativeDriver: false,
          }),
        ),
        wrap(
          Animated.timing(buttonAnimator.current, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ),
      ]).then(() => {
        CommentTransition.resetIndex();
        setTimeout(resolve, 10);
      });
    });
  }, [Y, wrap]);

  useEffect(() => {
    const postValue = postAnimator.current;
    const shadowValue = shadowAnimator.current;
    const buttonValue = buttonAnimator.current;
    Animated.sequence([
      Animated.timing(postValue, {
        toValue: 1,
        delay: 200,
        useNativeDriver: false,
        duration: Math.max(400, Y),
      }),
      Animated.timing(buttonValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
    return () => {
      postValue.setValue(0);
      shadowValue.setValue(0);
      buttonValue.setValue(0);
    };
  }, [Y]);

  useEffect(() => {
    Router.registerExitTransition(reverse);
  }, [reverse]);

  const navigate = useCallback(() => {
    Router.navigate("feed");
  }, []);

  return (
    <Animated.View
      style={[
        Styles.container,
        {
          width: postAnimator.current.interpolate({
            inputRange: [0, 1],
            outputRange: [
              Dimensions.get("screen").width * 0.9,
              Dimensions.get("screen").width,
            ],
          }),
          height: postAnimator.current.interpolate({
            inputRange: [0, 1],
            outputRange: [height, height * 1.1 + offsets.top],
          }),
          borderRadius: postAnimator.current.interpolate({
            inputRange: [0, 1],
            outputRange: [5, 0],
          }),
          transform: [
            {
              translateY: postAnimator.current.interpolate({
                inputRange: [0, 1],
                outputRange: [Y - offsets.top, -offsets.top],
              }),
            },
            {
              translateX: postAnimator.current.interpolate({
                inputRange: [0, 1],
                outputRange: [offsets.left + X, 0],
              }),
            },
          ],
        },
      ]}>
      <PostTile index={index} post={post} style={Styles.post} />
      <CloseButton
        onPress={navigate}
        iconColor={Theme.GRAY_TEXT}
        style={[
          Styles.closeButton,
          {
            top: offsets.top + height * 0.1,
            transform: [
              {
                scale: basicInterpolator(buttonAnimator.current),
              },
            ],
          },
        ]}
      />
    </Animated.View>
  );
};
