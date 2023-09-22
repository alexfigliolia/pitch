import type { FC, ReactNode } from "react";
import React, { memo } from "react";
import type { TextProps } from "react-native";
import { Animated } from "react-native";

interface Props extends TextProps {
  children: ReactNode;
}

export const JosefinText: FC<Props> = memo(({ children, ...props }) => {
  return (
    <Animated.Text
      {...props}
      style={[{ fontFamily: "Josefin Sans" }, props.style]}>
      {children}
    </Animated.Text>
  );
});
