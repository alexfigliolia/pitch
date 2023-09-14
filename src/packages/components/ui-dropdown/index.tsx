import { FixedSelect } from "@packages/state/FixedSelect";
import type { FC } from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { Text, TextInput, View } from "react-native";
import { Styles } from "./Styles";

export const UIDropDown: FC<{
  value: string;
  list: string[];
  title?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}> = ({ value, onChange, list, title = "", placeholder = "" }) => {
  const subscription = useRef<string | undefined>();
  const inputRef = useRef<TextInput>(null);
  const [open, setOpen] = useState(false);
  const [ID, setID] = useState<string | undefined>();
  const onPress = useCallback(() => {
    setID(FixedSelect.open(value, list, title));
    setOpen(true);
  }, [value, list, title]);

  const toggle = useCallback(
    (_: any) => {
      if (open) {
        return FixedSelect.close();
      }
      onPress();
    },
    [open, onPress],
  );

  const preventDefault = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      e.preventDefault();
    },
    [],
  );

  useEffect(() => {
    if (typeof ID !== "string") {
      return;
    }
    subscription.current = FixedSelect.subscribe(state => {
      const active = state.ID === ID;
      setOpen(active);
      if (active) {
        onChange(state.selectedValue);
      }
    });
    return () => {
      if (typeof subscription.current === "string") {
        FixedSelect.unsubscribe(subscription.current);
      }
    };
  }, [ID, onChange]);

  return (
    <View style={[Styles.container, open ? Styles.focused : {}]}>
      <TextInput
        ref={inputRef}
        inputMode="none"
        onPressIn={toggle}
        style={Styles.touchable}
        onChange={preventDefault}>
        {value === "" ? (
          <Text style={Styles.placeholder}>{placeholder}</Text>
        ) : (
          <Text style={Styles.value}>{value}</Text>
        )}
      </TextInput>
    </View>
  );
};
