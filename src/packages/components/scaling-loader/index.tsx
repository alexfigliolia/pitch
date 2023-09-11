import React, { memo, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Loader } from "@packages/icons/loader";
import { basicInterpolator } from "@packages/styles/Helpers";
import { Styles } from "./Styles";

export const ScalingLoader = memo(() => {
  const scale = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(scale.current, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        Styles.loader,
        {
          opacity: basicInterpolator(scale.current),
          transform: [{ scale: basicInterpolator(scale.current) }],
        },
      ]}>
      <Loader />
    </Animated.View>
  );
});
