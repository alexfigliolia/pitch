import type { FC } from "react";
import React from "react";
import { Svg, G, Line } from "react-native-svg";

export const Plus: FC<{ color?: string }> = ({ color = "#fff" }) => {
  return (
    <Svg viewBox="0 0 24 24">
      <G id="Complete">
        <G data-name="add" id="add-2">
          <G>
            <Line
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="12"
              x2="12"
              y1="19"
              y2="5"
            />

            <Line
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="5"
              x2="19"
              y1="12"
              y2="12"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};
