import type { FC, ReactNode } from "react";
import React, { Fragment, useEffect, useState } from "react";
import { DeviceStorage } from "@packages/local-storage";
import { verifyQuery } from "@packages/graphql/queries/authentication.gql";
import { Authentication } from "@packages/state/Authentication";
import type { Query } from "@packages/graphql";
import { GraphQLClient } from "@packages/graphql";
import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export interface Props {
  redirect: string;
  children: ReactNode;
}

export const AuthenticatedRoute: FC<Props> = ({
  children,
  redirect = "login",
}) => {
  const [disabled, setDisabled] = useState(true);
  const navigation = useNavigation<NavigationProp<any>>();
  useEffect(() => {
    void DeviceStorage.getItem("P_User").then(async value => {
      if (!value) navigation.navigate(redirect);
      const client = new GraphQLClient<Query["verifyToken"]>({
        query: verifyQuery.toString(),
        variables: {},
      });
      try {
        const response = await client.request();
        if (response.errors?.length) {
          return setDisabled(true);
        }
        const user = response.data;
        Authentication.update(state => {
          state.id = user.id;
          state.name = user.name;
          state.email = user.email;
          state.verified = user.verified;
        });
      } catch (error) {
        setDisabled(true);
      }
    });
  }, [navigation, redirect]);
  if (disabled) {
    return null;
  }
  return <Fragment>{children}</Fragment>;
};
