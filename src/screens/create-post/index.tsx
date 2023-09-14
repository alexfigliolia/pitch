import React, { useCallback, useState } from "react";
import type { GestureResponderEvent } from "react-native";
import {
  View,
  Text,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Styles } from "./Styles";
import { UITextArea } from "@packages/components/ui-text-area";
import { FixedSelect } from "@packages/components/fixed-select";
import { UIDropDown } from "@packages/components/ui-dropdown";
import { FixedSelect as FixedSelectState } from "@packages/state/FixedSelect";
import { UITags } from "@packages/components/ui-tags";
import { GradientButton } from "@packages/components/gradient-button";
import type {
  Mutation,
  MutationCreatePostArgs,
  Visibility as VisEnum,
} from "@packages/graphql";
import { graphQLRequest } from "@packages/graphql";
import { createPostMutation } from "@packages/graphql/queries/posts.gql";
import { Authentication } from "@packages/state/Authentication";
import { Visibility } from "@packages/posts";

export const CreatePost = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [, setError] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [visibility, setVisibility] = useState("");

  const dismissDropDown = useCallback(() => {
    FixedSelectState.close();
  }, []);

  const dismissAll = useCallback(() => {
    Keyboard.dismiss();
    FixedSelectState.close();
  }, []);

  const create = async () => {
    try {
      await graphQLRequest<
        Pick<Mutation, "createPost">,
        MutationCreatePostArgs
      >({
        query: createPostMutation,
        variables: {
          text,
          tags,
          title,
          user_id: Authentication.getState().id,
          visibility: visibility as VisEnum,
        },
      });
    } catch (e: any) {
      setError(e?.message || "");
    }
  };

  const submit = (_: GestureResponderEvent) => {
    void create();
  };

  return (
    <SafeAreaView style={Styles.container}>
      <KeyboardAvoidingView behavior="padding" style={Styles.container}>
        <TouchableWithoutFeedback style={Styles.container} onPress={dismissAll}>
          <View style={Styles.content}>
            <Text style={Styles.text}>Request a Pitch</Text>
            <UITextArea
              value={title}
              onFocus={dismissDropDown}
              onChangeText={setTitle}
              placeholder="Title"
            />
            <UITextArea
              value={text}
              height={175}
              onFocus={dismissDropDown}
              onChangeText={setText}
              placeholder="Description"
            />
            <UITags
              editable
              tags={tags}
              onChange={setTags}
              onFocus={dismissDropDown}
            />
            <UIDropDown
              value={visibility}
              placeholder="Visibility"
              list={Visibility.values}
              onChange={setVisibility}
              title="Who can see your post?"
            />
            <GradientButton text="Create" onPress={submit} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <FixedSelect />
    </SafeAreaView>
  );
};
