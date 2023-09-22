import { Batman } from "@packages/icons/batman";
import { UtilityStyles } from "@packages/styles";
import type { FC } from "react";
import React, { memo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Animated, Image, View } from "react-native";
import { Styles } from "./Styles";

interface Props {
  image?: string;
  style?: StyleProp<ViewStyle>;
}

export const Avatar: FC<Props> = memo(({ image, style }) => {
  return (
    <Animated.View style={[Styles.image, style]}>
      {image ? (
        <Image style={UtilityStyles.Fill} source={{ uri: image }} />
      ) : (
        <View style={Styles.batman}>
          <Batman />
        </View>
      )}
    </Animated.View>
  );
});
