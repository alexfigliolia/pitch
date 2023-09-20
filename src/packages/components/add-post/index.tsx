import React, { memo, useCallback, useEffect, useRef } from "react";
import { Animated, Easing, TouchableOpacity, View } from "react-native";
import { Router } from "@figliolia/rn-navigation";
import { UtilityStyles, basicInterpolator } from "@packages/styles";
import { Plus } from "@packages/icons/plus";
import { Styles } from "./Styles";

export const AddPost = memo(() => {
  const animation = useRef(new Animated.Value(1));

  const transition = useCallback((toValue: 0 | 1) => {
    return new Promise<void>(resolve => {
      Animated.timing(animation.current, {
        toValue,
        duration: 500,
        useNativeDriver: true,
        easing:
          toValue === 1
            ? Easing.out(Easing.back(1))
            : Easing.in(Easing.back(1)),
        delay: toValue === 1 ? 1000 : 0,
      }).start(() => {
        resolve();
      });
    });
  }, []);

  const navigate = useCallback(() => {
    Router.navigate("create-post");
  }, []);

  useEffect(() => {
    Router.registerExitTransition(() => {
      if (Router.currentRoute === "comments") {
        return transition(0);
      }
    });
    if (Router.lastRoute === "comments") {
      animation.current.setValue(0);
      void transition(1);
    }
  }, [transition]);

  return (
    <Animated.View
      style={[
        Styles.container,
        {
          transform: [{ scale: basicInterpolator(animation.current) }],
        },
      ]}>
      <TouchableOpacity
        onPress={navigate}
        style={[UtilityStyles.Fill, UtilityStyles.Center]}>
        <View style={Styles.icon}>
          <Plus />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});
