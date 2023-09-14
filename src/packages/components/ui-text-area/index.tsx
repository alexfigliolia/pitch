import React, { useState, type FC } from "react";
import type {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from "react-native";
import { TextInput, View } from "react-native";
import { Styles } from "./Styles";
import { Theme } from "@packages/styles";

export const UITextArea: FC<
  {
    value: string;
    height?: number;
    placeholder?: string;
    onChangeText: (text: string) => void;
  } & TextInputProps
> = ({ value, onChangeText, placeholder = "", height = 100, ...rest }) => {
  const [focused, setFocused] = useState(false);
  const focus = (type: "blur" | "focus") => {
    return (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (type === "blur") {
        rest?.onBlur?.(e);
        return setFocused(false);
      }
      rest?.onFocus?.(e);
      setFocused(true);
    };
  };

  const change = (text: string) => {
    onChangeText(text);
  };

  return (
    <View style={[Styles.container, focused ? Styles.valid : {}, { height }]}>
      <TextInput
        value={value}
        style={[Styles.input, { height }]}
        onChangeText={change}
        placeholder={placeholder}
        placeholderTextColor={Theme.LIGHT_BLACK}
        {...rest}
        onBlur={focus("blur")}
        onFocus={focus("focus")}
        multiline
      />
    </View>
  );
};
