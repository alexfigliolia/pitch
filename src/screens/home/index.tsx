import { AuthenticatedRoute } from "@packages/components/authenticated-route";
import React, { Component } from "react";
import { Text } from "react-native";

export class Home extends Component {
  render() {
    return (
      <AuthenticatedRoute redirect="sign-up">
        <Text>Hello ashhhashdf;alsdkfja;ldskj</Text>
      </AuthenticatedRoute>
    );
  }
}
