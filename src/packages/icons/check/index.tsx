import type { FC } from "react";
import React, { memo } from "react";
import { Svg, Path } from "react-native-svg";

export const Check: FC<{ color?: string }> = memo(({ color = "#fff" }) => {
  return (
    <Svg strokeWidth="1.5" viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 13l4 4L19 7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
});
