import type { FC, ReactNode } from "react";
import React, { Fragment, useEffect } from "react";
import { DeviceStorage } from "@packages/local-storage";
import { verifyQuery } from "@packages/graphql/queries/authentication.gql";
import { Authentication } from "@packages/state/Authentication";
import type { Query, VerifyQueryVariables } from "@packages/graphql";
import { GraphQLClient } from "@packages/graphql";
import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export interface Props {
  redirect?: string;
  children: ReactNode;
}

export const AuthenticatedRoute: FC<Props> = ({
  children,
  redirect = "login",
}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  useEffect(() => {
    void DeviceStorage.getItem("P_User").then(async token => {
      if (!token) {
        return navigation.navigate(redirect);
      }
      const client = new GraphQLClient<
        Pick<Query, "verifyTokenMobile">,
        VerifyQueryVariables
      >({
        query: verifyQuery.toString(),
        variables: {
          token,
        },
      });
      try {
        const response = await client.request();
        if (response.errors?.length) {
          return navigation.navigate(redirect);
        }
        const user = response.data.verifyTokenMobile;
        Authentication.update(state => {
          state.id = user.id;
          state.name = user.name;
          state.email = user.email;
          state.verified = user.verified;
        });
      } catch (error) {
        return navigation.navigate(redirect);
      }
    });
  }, [navigation, redirect]);
  return <Fragment>{children}</Fragment>;
};
