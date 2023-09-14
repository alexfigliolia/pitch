import { Theme, UtilityStyles } from "@packages/styles";
import type { FC } from "react";
import React from "react";
import type { GestureResponderEvent } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Styles } from "./Styles";

export const GradientButton: FC<{
  text: string;
  onPress: (e: GestureResponderEvent) => void;
}> = ({ text, onPress }) => {
  return (
    <View style={Styles.button}>
      <LinearGradient
        style={Styles.buttonInner}
        colors={[Theme.CORE_ORANGE, Theme.DEEP_ORANGE]}>
        <TouchableOpacity
          onPress={onPress}
          style={[UtilityStyles.Fill, UtilityStyles.Center]}>
          <Text style={Styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};
