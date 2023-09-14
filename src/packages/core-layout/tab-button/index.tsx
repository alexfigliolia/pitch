import React, { useCallback } from "react";
import type { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { Feed } from "@packages/icons/feed";
import { Theme } from "@packages/styles";
import type { NavigationProp } from "@react-navigation/native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { Profile } from "@packages/icons/profile";
import { Settings } from "@packages/icons/settings";
import { Styles } from "./Styles";

export const TabButton: FC<{
  name: string;
}> = ({ name }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const currentRoute = useNavigationState(
    state => state.routes[state.index].name,
  );

  const navigate = useCallback(() => {
    navigation.navigate(name);
  }, [name, navigation]);

  const getSize = useCallback((name: string) => {
    switch (name) {
      case "profile":
        return 32.5;
      case "feed":
      case "settings":
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
          {getIcon(name, currentRoute)}
        </View>
      </TouchableOpacity>
    </View>
  );
};
