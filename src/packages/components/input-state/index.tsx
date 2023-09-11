import type { FC } from "react";
import React, { useEffect, useMemo, useRef } from "react";
import { Animated, View } from "react-native";
import X from "@packages/public/icons/X.svg";
import Check from "@packages/public/icons/check.svg";
import { Styles } from "./Styles";
import { basicInterpolator } from "@packages/styles/Helpers";

export const InputState: FC<{ state?: null | boolean }> = ({
  state = null,
}) => {
  const props = useMemo(
    () => ({
      duration: 300,
      useNativeDriver: true,
    }),
    [],
  );
  const errorAnim = useRef(new Animated.Value(0));
  const successAnim = useRef(new Animated.Value(0));
  useEffect(() => {
    switch (state) {
      case null:
        Animated.parallel([
          Animated.timing(errorAnim.current, {
            toValue: 0,
            ...props,
          }),
          Animated.timing(successAnim.current, {
            toValue: 0,
            ...props,
          }),
        ]).start();
        break;
      case false:
        Animated.parallel([
          Animated.timing(errorAnim.current, {
            toValue: 1,
            ...props,
          }),
          Animated.timing(successAnim.current, {
            toValue: 0,
            ...props,
          }),
        ]).start();
        break;
      case true:
        Animated.parallel([
          Animated.timing(errorAnim.current, {
            toValue: 0,
            ...props,
          }),
          Animated.timing(successAnim.current, {
            toValue: 1,
            ...props,
          }),
        ]).start();
        break;
    }
  }, [state, props]);
  return (
    <View style={Styles.container}>
      <Animated.View
        style={[
          Styles.icon,
          Styles.success,
          {
            opacity: basicInterpolator(successAnim.current),
          },
        ]}>
        <Check height={20} width={20} style={Styles.svg} />
      </Animated.View>
      <Animated.View
        style={[
          Styles.icon,
          Styles.error,
          { opacity: basicInterpolator(errorAnim.current) },
        ]}>
        <X style={Styles.svg} />
      </Animated.View>
    </View>
  );
};
