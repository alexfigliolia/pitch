import React from "react";
import type { ComponentType, FC } from "react";
import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import type { Subtract } from "./types";

export const withNavigation = <
  ComponentProps extends {
    navigation: NavigationProp<ReactNavigation.RootParamList>;
  },
>(
  WrappedComponent: ComponentType<ComponentProps>,
): ComponentType<
  Subtract<
    ComponentProps,
    { navigation: NavigationProp<ReactNavigation.RootParamList> }
  >
> => {
  const WithNavigationComponent: FC<
    Subtract<
      ComponentProps,
      { navigation: NavigationProp<ReactNavigation.RootParamList> }
    >
  > = props => {
    const navigation = useNavigation();
    // @ts-ignore
    return <WrappedComponent {...props} navigation={navigation} />;
  };

  WithNavigationComponent.displayName = `WithNavigation(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;
  return WithNavigationComponent;
};
