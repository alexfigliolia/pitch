import type { FC, ReactNode } from "react";
import React, { Fragment, useEffect, useState } from "react";
import { Router } from "@figliolia/rn-navigation";
import { DeviceStorage } from "@packages/local-storage";
import { verifyQuery } from "@packages/graphql/queries/authentication.gql";
import { Authentication } from "@packages/state/Authentication";
import type { Query, VerifyQueryVariables } from "@packages/graphql";
import { GraphQLClient } from "@packages/graphql";

export interface Props {
  redirect?: string;
  children: ReactNode;
}

export const AuthenticatedRoute: FC<Props> = ({
  children,
  redirect = "login",
}) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    void DeviceStorage.getItem("P_User").then(async token => {
      if (!token) {
        return Router.navigate(redirect);
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
          return Router.navigate(redirect);
        }
        const user = response.data.verifyTokenMobile;
        Authentication.setUser(user);
        setChecked(true);
      } catch (error) {
        return Router.navigate(redirect);
      }
    });
  }, [redirect]);

  if (!checked) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};
