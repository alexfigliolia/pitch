import type { FC } from "react";
import React, { memo } from "react";
import { Svg, Path } from "react-native-svg";

export const X: FC<{ color?: string }> = memo(({ color = "#fff" }) => {
  return (
    <Svg viewBox="0 0 24 24" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
        fill={color}
      />
    </Svg>
  );
});
