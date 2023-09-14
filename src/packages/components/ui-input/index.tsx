import React, { useState, type FC } from "react";
import type { TextInputProps } from "react-native";
import { TextInput, View } from "react-native";
import { Styles } from "./Styles";

export const UIInput: FC<
  {
    value: string;
    placeholder?: string;
    onChangeText: (text: string) => void;
  } & TextInputProps
> = ({ value, onChangeText, placeholder = "", ...rest }) => {
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
    onChangeText(text);
  };

  return (
    <View style={[Styles.container, focused ? Styles.valid : undefined]}>
      <TextInput
        value={value}
        style={Styles.input}
        onChangeText={change}
        onBlur={focus("blur")}
        onFocus={focus("focus")}
        placeholder={placeholder}
        placeholderTextColor="rgb(114, 114, 114)"
        {...rest}
      />
    </View>
  );
};
