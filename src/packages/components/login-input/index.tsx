import React, { useState, type FC } from "react";
import type { TextInputProps } from "react-native";
import { TextInput, View } from "react-native";
import { InputState } from "@packages/components/input-state";
import { Styles } from "./Styles";
import type { Validator } from "./types";

export const LoginInput: FC<
  {
    value: string;
    password?: boolean;
    placeholder?: string;
    validator?: Validator;
    onChangeText: (text: string) => void;
  } & TextInputProps
> = ({
  value,
  onChangeText,
  placeholder = "",
  password = false,
  validator = () => null,
  ...rest
}) => {
  const [valid, setValid] = useState<boolean | null>(validator(value));
  const [focused, setFocused] = useState(false);
  const focus = (type: "blur" | "focus") => {
    return () => {
      if (type === "blur") {
        return setFocused(false);
      }
      setFocused(true);
    };
  };

  const change = (text: string) => {
    setValid(validator(text));
    onChangeText(text);
  };

  return (
    <View style={[Styles.container, focused ? Styles.valid : undefined]}>
      <View style={Styles.state}>
        <InputState state={valid} />
      </View>
      <TextInput
        value={value}
        style={Styles.input}
        onChangeText={change}
        onBlur={focus("blur")}
        onFocus={focus("focus")}
        placeholder={placeholder}
        secureTextEntry={password}
        placeholderTextColor="rgb(114, 114, 114)"
        {...rest}
      />
    </View>
  );
};
