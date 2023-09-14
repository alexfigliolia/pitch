import React, { memo, useCallback, useEffect, useRef } from "react";
import type { FC } from "react";
import type { GestureResponderEvent } from "react-native";
import { Dimensions } from "react-native";
import {
  View,
  Text,
  Easing,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { UtilityStyles } from "@packages/styles";
import {
  useFixedSelect,
  FixedSelect as FixedSelectState,
} from "@packages/state/FixedSelect";
import { Styles } from "./Styles";
import { X } from "@packages/icons/x";

export const FixedSelect: FC<Record<string, never>> = memo(() => {
  const animation = useRef(new Animated.Value(0));
  const list = useFixedSelect(state => state.list);
  const open = useFixedSelect(state => state.open);
  const title = useFixedSelect(state => state.title);
  const value = useFixedSelect(state => state.selectedValue);

  const toggle = (openState: boolean) => {
    if (!openState) {
      return Animated.timing(animation.current, {
        toValue: 0,
        duration: 350,
        // @ts-ignore
        easing: Easing.back(),
        useNativeDriver: true,
      }).start();
    }
    Animated.spring(animation.current, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    toggle(open);
  }, [open]);

  const select = useCallback((val: string) => {
    return (_: GestureResponderEvent) => {
      FixedSelectState.update(state => {
        state.selectedValue = val === state.selectedValue ? "" : val;
      });
    };
  }, []);

  const close = useCallback(() => {
    FixedSelectState.close();
  }, []);

  return (
    <Animated.View
      style={[
        Styles.container,
        {
          transform: [
            {
              translateY: animation.current.interpolate({
                inputRange: [0, 1],
                outputRange: [Dimensions.get("screen").height * 0.4, 0],
              }),
            },
          ],
        },
      ]}>
      {title && (
        <View style={Styles.titleContainer}>
          <View style={Styles.closer}>
            <TouchableOpacity onPress={close} style={Styles.closerInner}>
              <X />
            </TouchableOpacity>
          </View>
          <Text style={Styles.title}>{title}</Text>
        </View>
      )}
      <ScrollView
        contentContainerStyle={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
        style={Styles.scrollView}>
        {list.map(item => {
          return (
            <View
              key={item}
              style={[
                Styles.buttonContainer,
                item === value ? Styles.buttonContainerSelected : {},
              ]}>
              <TouchableOpacity
                onPress={select(item)}
                style={[UtilityStyles.Fill, UtilityStyles.Center]}>
                <Text
                  style={[
                    Styles.buttonText,
                    item === value ? Styles.buttonTextSelected : {},
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
});
