import React, { memo, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Check } from "@packages/icons/check";
import { basicInterpolator } from "@packages/styles/Helpers";
import { Styles } from "./Styles";

export const ScalingCheck = memo(() => {
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
        Styles.check,
        {
          opacity: basicInterpolator(scale.current),
          transform: [{ scale: basicInterpolator(scale.current) }],
        },
      ]}>
      <Check />
    </Animated.View>
  );
});
