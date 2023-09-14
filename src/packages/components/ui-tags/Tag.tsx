import React, { useCallback, useRef } from "react";
import type { FC } from "react";
import { View, TouchableOpacity, Animated, Text } from "react-native";
import { Styles } from "./Styles";
import { X } from "@packages/icons/x";

export const Tag: FC<{
  tag: string;
  editable?: boolean;
  onDelete?: (tag: string) => void;
}> = ({ tag, onDelete, editable }) => {
  const active = useRef(false);
  const xAnimation = useRef(new Animated.Value(0));
  const textAnimation = useRef(new Animated.Value(0));
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const animate = useCallback((toValue: 1 | 0) => {
    Animated.parallel([
      Animated.timing(xAnimation.current, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(textAnimation.current, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    if (toValue === 1) {
      timer.current = setTimeout(() => {
        animate(0);
        active.current = false;
      }, 4000);
    }
  }, []);

  const toggle = useCallback(() => {
    animate(active.current ? 0 : 1);
    if (active.current) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      return onDelete?.(tag);
    }
    active.current = true;
  }, [tag, onDelete, animate]);

  return (
    <View style={Styles.tag}>
      {editable ? (
        <TouchableOpacity style={Styles.touchable} onPress={toggle}>
          <Animated.View
            style={[
              Styles.delete,
              {
                transform: [
                  {
                    translateY: xAnimation.current.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-40, 0],
                    }),
                  },
                ],
              },
            ]}>
            <View style={Styles.xIcon}>
              <X />
            </View>
          </Animated.View>
          <Animated.Text
            style={[
              Styles.tagText,
              {
                transform: [
                  {
                    translateY: textAnimation.current.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 40],
                    }),
                  },
                ],
              },
            ]}>
            {tag}
          </Animated.Text>
        </TouchableOpacity>
      ) : (
        <View style={Styles.touchable}>
          <Text style={Styles.tagText}>{tag}</Text>
        </View>
      )}
    </View>
  );
};
