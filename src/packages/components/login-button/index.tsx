import React, { type FC, useCallback } from "react";
import type { GestureResponderEvent } from "react-native";
import { Text, TouchableHighlight } from "react-native";
import { ScalingCheck } from "@packages/components/scaling-check";
import { ScalingLoader } from "@packages/components/scaling-loader";
import { Styles } from "./Styles";

export const LoginButton: FC<{
  text: string;
  loading?: boolean;
  success?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}> = ({ text, loading, success, onPress }) => {
  const noop = useCallback(() => {}, []);

  const renderChildren = () => {
    if (success) {
      return <ScalingCheck />;
    }
    if (loading) {
      return <ScalingLoader />;
    }
    return <Text style={Styles.text}>{text}</Text>;
  };

  return (
    <TouchableHighlight
      onPress={onPress}
      onPressIn={noop}
      onPressOut={noop}
      style={Styles.container}
      underlayColor="rgb(255, 144, 93)">
      {renderChildren()}
    </TouchableHighlight>
  );
};
