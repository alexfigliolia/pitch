import React, { Component } from "react";
import type {
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { View, TextInput, LayoutAnimation } from "react-native";
import { Styles } from "./Styles";
import { Theme } from "@packages/styles";
import { Tag } from "./Tag";
import type { Props } from "./types";

export class UITags extends Component<
  Props,
  { input: string; focused: boolean }
> {
  private inputRef?: TextInput;
  constructor(props: Props) {
    super(props);
    this.state = { input: "", focused: false };
  }

  UNSAFE_componentWillReceiveProps({ tags }: Props) {
    if (tags.length !== this.props.tags.length) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }

  private onInput = (input: string) => {
    this.setState({ input });
  };

  private onFocus = () => {
    this.props.onFocus?.();
    this.setState({ focused: true });
  };

  private onBlur = () => {
    this.setState({ focused: false });
  };

  private onKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    const { tags, onChange } = this.props;
    const { input } = this.state;
    switch (e.nativeEvent.key) {
      case "Backspace":
        if (input.length || !tags.length) {
          return;
        }
        this.setState({ input: tags[tags.length - 1] });
        onChange?.(tags.slice(0, -1));
        break;
      case " ":
        if (!input.length || tags.includes(input)) {
          return;
        }
        onChange?.([...tags, input]);
        this.setState({ input: "" });
        this.inputRef?.clear();
        break;
      default:
        return;
    }
  };

  private deleteTag = (tag: string) => {
    const { tags, onChange } = this.props;
    const idx = tags.indexOf(tag);
    if (idx === -1) {
      return;
    }
    const copy = tags.slice();
    copy.splice(idx, 1);
    onChange?.(copy);
  };

  private setRef = (c: TextInput) => {
    this.inputRef = c;
  };

  render() {
    const { tags, editable } = this.props;
    const { input, focused } = this.state;
    return (
      <View style={Styles.container}>
        <View style={[Styles.tags, tags.length ? Styles.active : {}]}>
          {tags.map(tag => {
            return (
              <Tag
                key={tag}
                tag={tag}
                editable={editable}
                onDelete={this.deleteTag}
              />
            );
          })}
        </View>
        {editable && (
          <View style={[Styles.editor, focused ? Styles.focused : {}]}>
            <TextInput
              value={input}
              ref={this.setRef}
              placeholder="Tags"
              style={Styles.input}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              onChangeText={this.onInput}
              onKeyPress={this.onKeyPress}
              placeholderTextColor={Theme.LIGHT_BLACK}
            />
          </View>
        )}
      </View>
    );
  }
}
