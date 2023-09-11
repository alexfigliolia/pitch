import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import type { FC, ReactNode } from "react";
import React, { Fragment } from "react";

export interface Props {
  redirect: string;
  children: ReactNode;
  condition: () => boolean;
}

export const ProtectedRoute: FC<Props> = ({
  children,
  redirect = "login",
  condition,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  if (!condition) {
    navigation.navigate(redirect);
  }
  return <Fragment>{children}</Fragment>;
};
