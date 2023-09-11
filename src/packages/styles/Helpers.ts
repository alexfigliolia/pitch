import type { Animated } from "react-native";
import { StyleSheet } from "react-native";

export const basicInterpolator = (
  anim: Animated.Value,
  outputRange: [number, number] | [string, string] = [0, 1],
) => {
  return anim.interpolate({
    inputRange: [0, 1],
    outputRange,
  });
};

/**
 * - CREATE A COMPOSABLE STYLE OBJECT -
 *
 * Pass animated values or other items scoped specifically
 * to an implementation
 */
export const compose =
  <T extends Record<string, any>, V extends { [K in keyof T]?: any }>( // eslint-disable-line no-unused-vars
    Styles: T,
  ) =>
  (instance: V): T & V => {
    const composed: Record<string, any> = {};
    for (const key in Styles) {
      const nodeStyles = Styles[key];
      if (key in instance) {
        composed[key] = { ...nodeStyles, ...instance[key] };
      } else {
        composed[key] = nodeStyles;
      }
    }
    return composed as unknown as T & V;
  };

/**
 * - CREATE A COMPOSABLE STYLESHEET -
 *
 * Pass values scoped specifically to an implementation
 */
export const composeStyleSheet =
  <T extends Record<string, any>, V extends Record<keyof T | string, any>>(
    Styles: T,
  ) =>
  (instance: V): T & V => {
    return StyleSheet.create(compose(Styles)(instance)) as T & V;
  };
