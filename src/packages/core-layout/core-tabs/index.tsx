import type { FC } from "react";
import React, { memo } from "react";
import { Styles } from "./Styles";
import { TabButton } from "@packages/core-layout";
import { View } from "react-native";

export const CoreTabs: FC<Record<string, never>> = memo(() => {
  return (
    <View style={Styles.container}>
      <TabButton name="feed" />
      <TabButton name="profile" />
      <TabButton name="settings" />
    </View>
  );
});
