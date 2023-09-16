import React, { useCallback } from "react";
import type { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { useCurrentRoute, Router } from "@figliolia/rn-navigation";
import { Feed } from "@packages/icons/feed";
import { Theme } from "@packages/styles";
import { Profile } from "@packages/icons/profile";
import { Settings } from "@packages/icons/settings";
import { Styles } from "./Styles";

export const TabButton: FC<{
  name: string;
}> = ({ name }) => {
  const route = useCurrentRoute();

  const navigate = useCallback(() => {
    Router.navigate(name);
  }, [name]);

  const getSize = useCallback((name: string) => {
    switch (name) {
      case "profile":
        return 32.5;
      case "feed":
      case "settings":
      default:
        return 35;
    }
  }, []);

  const getIcon = useCallback((name: string, currentRoute: string) => {
    const active = currentRoute === name;
    switch (name) {
      case "profile":
        return <Profile color={Theme.CORE_GOLD} fill={active} />;
      case "settings":
        return <Settings color={Theme.CORE_GOLD} fill={active} />;
      case "feed":
      default:
        return <Feed color={Theme.CORE_GOLD} fill={active} />;
    }
  }, []);

  return (
    <View style={Styles.buttonContainer}>
      <TouchableOpacity style={Styles.button} onPress={navigate}>
        <View style={{ height: getSize(name), width: getSize(name) }}>
          {getIcon(name, route)}
        </View>
      </TouchableOpacity>
    </View>
  );
};
