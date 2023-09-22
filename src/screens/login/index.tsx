import React, { Component } from "react";
import { Text, TouchableHighlight, Animated } from "react-native";
import { Router } from "@figliolia/rn-navigation";
import { ProtectedRoute } from "@packages/components/protected-route";
import { LoginInput } from "@packages/components/login-input";
import { Validators } from "@packages/forms";
import { LoginButton } from "@packages/components/login-button";
import { graphQLRequest } from "@packages/graphql";
import type { LoginQueryVariables, Query } from "@packages/graphql";
import { loginQuery } from "@packages/graphql/queries/authentication.gql";
import { SetCookiePlugin } from "@packages/graphql/plugins/SetCookiePlugin";
import { Authentication } from "@packages/state/Authentication";
import { AuthScreen } from "@packages/components/auth-screen";
import { Styles } from "@packages/components/auth-screen/Styles";
import { basicInterpolator } from "@packages/styles";
import type { State } from "./types";

export class Login extends Component<Record<string, never>, State> {
  private animator = new Animated.Value(0);
  constructor(props: any) {
    super(props);
    this.state = {
      error: "",
      email: "",
      password: "",
      loading: false,
      success: false,
    };
    Router.registerExitTransition(this.transition(0));
  }

  componentDidMount() {
    void this.transition(1)();
  }

  private transition(toValue: 0 | 1) {
    return () =>
      new Promise<void>(resolve => {
        Animated.timing(this.animator, {
          toValue,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          resolve();
        });
      });
  }

  private onChange(key: keyof State) {
    return (value: string) => {
      // @ts-ignore
      this.setState({ [key]: value });
    };
  }

  private onChangeEmail = this.onChange("email");

  private onChangePassword = this.onChange("password");

  private submit = () => {
    this.setState({ error: "", loading: true });
    if (!this.validate()) {
      return;
    }
    void this.login();
  };

  private validate() {
    const { email, password } = this.state;
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

  private async login() {
    try {
      const { email, password } = this.state;
      const response = await graphQLRequest<
        Pick<Query, "login">,
        LoginQueryVariables
      >({
        query: loginQuery,
        variables: {
          email,
          password,
        },
        plugins: [SetCookiePlugin],
      });
      const user = response.data.login;
      Authentication.setUser(user);
      this.setState({
        loading: false,
        success: true,
      });
      setTimeout(() => {
        Router.navigate("app");
      }, 1000);
    } catch (error: any) {
      this.setState({ error: error.message, loading: false });
    }
  }

  private navigate = () => {
    Router.navigate("sign-up");
  };

  render() {
    const { email, password, error, loading, success } = this.state;
    return (
      <ProtectedRoute
        redirect="app"
        condition={() => !Authentication.getState().token}>
        <AuthScreen>
          <Animated.View
            style={[
              Styles.greeting,
              { opacity: basicInterpolator(this.animator) },
            ]}>
            <Text style={Styles.title}>Hello!</Text>
            <Text style={Styles.subtext}>Sign into your account</Text>
          </Animated.View>
          <Animated.View
            style={[
              Styles.form,
              { opacity: basicInterpolator(this.animator) },
            ]}>
            <Text style={Styles.error}>&nbsp;{error}&nbsp;</Text>
            <LoginInput
              value={email}
              placeholder="Email"
              enterKeyHint="next"
              inputMode="email"
              onChangeText={this.onChangeEmail}
              validator={Validators.validEmail}
            />
            <LoginInput
              value={password}
              placeholder="Password"
              returnKeyType="done"
              secureTextEntry={true}
              onSubmitEditing={this.submit}
              onChangeText={this.onChangePassword}
              validator={Validators.validPassword}
            />
            <LoginButton
              text="Login"
              loading={loading}
              success={success}
              onPress={this.submit}
            />
          </Animated.View>
          <Animated.View
            style={[
              Styles.redirect,
              { opacity: basicInterpolator(this.animator) },
            ]}>
            <Text style={Styles.redirectReason}>Are you new here?</Text>
            <TouchableHighlight onPress={this.navigate}>
              <Text style={Styles.redirectLink}>Sign Up!</Text>
            </TouchableHighlight>
          </Animated.View>
        </AuthScreen>
      </ProtectedRoute>
    );
  }
}
