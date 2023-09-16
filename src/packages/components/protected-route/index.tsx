import type { FC, ReactNode } from "react";
import React, { Fragment } from "react";
import { Router } from "@figliolia/rn-navigation";

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
  if (!condition) {
    Router.navigate(redirect);
  }
  return <Fragment>{children}</Fragment>;
};
