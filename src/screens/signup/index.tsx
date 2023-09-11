import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProtectedRoute } from "@packages/components/protected-route";
import { LoginInput } from "@packages/components/login-input";
import { Validators } from "@packages/forms";
import { LoginButton } from "@packages/components/login-button";
import { graphQLRequest } from "@packages/graphql";
import type { Mutation, OnBoardMutationVariables } from "@packages/graphql";
import { onboardMutation } from "@packages/graphql/queries/authentication.gql";
import { SetCookiePlugin } from "@packages/graphql/plugins/SetCookiePlugin";
import { Authentication } from "@packages/state/Authentication";
import { AuthScreen } from "@packages/components/auth-screen";
import { Styles } from "./Styles";
import type { State } from "./types";

export class SignUp extends Component<
  { navigation: NativeStackNavigationProp<Record<string, object | undefined>> },
  State
> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      error: "",
      email: "",
      password: "",
      loading: false,
      success: false,
    };
  }

  private onChange(key: keyof State) {
    return (value: string) => {
      // @ts-ignore
      this.setState({ [key]: value });
    };
  }

  private onChangeName = this.onChange("name");

  private onChangeEmail = this.onChange("email");

  private onChangePassword = this.onChange("password");

  private submit = () => {
    this.setState({ error: "", loading: true });
    if (!this.validate()) {
      return;
    }
    void this.signUp();
  };

  private validate() {
    const { name, email, password } = this.state;
    if (!Validators.validName(name)) {
      this.setState({
        loading: false,
        error: "Your first and last name is required",
      });
      return false;
    }
    if (!Validators.validEmail(email)) {
      this.setState({
        loading: false,
        error: "A valid email address is required",
      });
      return false;
    }
    if (!Validators.validPassword(password)) {
      this.setState({
        loading: false,
        error: "Passwords must be at least 5 characters",
      });
      return false;
    }
    return true;
  }

  private async signUp() {
    try {
      const { name, email, password } = this.state;
      const response = await graphQLRequest<
        Pick<Mutation, "onboard">,
        OnBoardMutationVariables
      >({
        query: onboardMutation,
        variables: {
          name,
          email,
          password,
        },
        plugins: [SetCookiePlugin],
      });
      if (response.errors?.length) {
        return this.setState({
          loading: false,
          error: response.errors[0].message,
        });
      }
      const user = response.data.onboard;
      Authentication.update(state => {
        state.id = user.id;
        state.name = user.name;
        state.email = user.email;
        state.verified = user.verified;
      });
      this.setState({
        loading: false,
        success: true,
      });
      setTimeout(() => {
        this.props.navigation.navigate("home");
      }, 1000);
    } catch (error: any) {
      this.setState({ error: error.message, loading: false });
    }
  }

  private navigate = () => {
    this.props.navigation.navigate("login");
  };

  render() {
    const { name, email, password, error, loading, success } = this.state;
    return (
      <ProtectedRoute
        redirect="/"
        condition={() => !Authentication.getState().token}>
        <AuthScreen>
          <View style={Styles.greeting}>
            <Text style={Styles.title}>Hello!</Text>
            <Text style={Styles.subtext}>Create an account</Text>
          </View>
          <View style={Styles.form}>
            <Text style={Styles.error}>&nbsp;{error}&nbsp;</Text>
            <LoginInput
              value={name}
              placeholder="Name"
              enterKeyHint="next"
              onChangeText={this.onChangeName}
              validator={Validators.validName}
            />
            <LoginInput
              value={email}
              placeholder="Email"
              inputMode="email"
              enterKeyHint="next"
              onChangeText={this.onChangeEmail}
              validator={Validators.validEmail}
            />
            <LoginInput
              value={password}
              placeholder="Password"
              secureTextEntry={true}
              enterKeyHint="done"
              onSubmitEditing={this.submit}
              onChangeText={this.onChangePassword}
              validator={Validators.validPassword}
            />
            <LoginButton
              text="Sign Up"
              loading={loading}
              success={success}
              onPress={this.submit}
            />
          </View>
          <View style={Styles.redirect}>
            <Text style={Styles.redirectReason}>Already have an account?</Text>
            <TouchableHighlight onPress={this.navigate}>
              <Text style={Styles.redirectLink}>Login!</Text>
            </TouchableHighlight>
          </View>
        </AuthScreen>
      </ProtectedRoute>
    );
  }
}
