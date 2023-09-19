import React, { memo } from "react";
import type { FC } from "react";
import type { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { Animated, TouchableOpacity, View } from "react-native";
import { X } from "@packages/icons/x";
import { Styles } from "./Styles";

export const CloseButton: FC<{
  dimensions?: number;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  onPress: (e: GestureResponderEvent) => void;
}> = memo(({ style = {}, dimensions = 20, iconColor = "#000", onPress }) => {
  return (
    <Animated.View style={[Styles.container, style]}>
      <TouchableOpacity style={Styles.inner} onPress={onPress}>
        <View style={{ height: dimensions, width: dimensions }}>
          <X color={iconColor} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});
