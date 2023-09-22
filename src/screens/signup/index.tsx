import React, { Component } from "react";
import { Text, TouchableHighlight, Animated } from "react-native";
import { Router } from "@figliolia/rn-navigation";
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
import { Styles } from "@packages/components/auth-screen/Styles";
import { basicInterpolator } from "@packages/styles";
import type { State } from "./types";

export class SignUp extends Component<Record<string, never>, State> {
  private animator = new Animated.Value(0);
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
    Router.registerExitTransition(this.transition(0));
  }

  componentDidMount() {
    void this.transition(1)();
  }

  public transition(toValue: 0 | 1) {
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
      const user = response.data.onboard;
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
    Router.navigate("login");
  };

  render() {
    const { name, email, password, error, loading, success } = this.state;
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
            <Text style={Styles.subtext}>Create an account</Text>
          </Animated.View>
          <Animated.View
            style={[
              Styles.form,
              { opacity: basicInterpolator(this.animator) },
            ]}>
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
          </Animated.View>
          <Animated.View
            style={[
              Styles.redirect,
              { opacity: basicInterpolator(this.animator) },
            ]}>
            <Text style={Styles.redirectReason}>Already have an account?</Text>
            <TouchableHighlight onPress={this.navigate}>
              <Text style={Styles.redirectLink}>Login!</Text>
            </TouchableHighlight>
          </Animated.View>
        </AuthScreen>
      </ProtectedRoute>
    );
  }
}
