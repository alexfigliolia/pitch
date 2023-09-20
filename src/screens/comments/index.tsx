import type { FC } from "react";
import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { FocusedPost } from "@packages/posts";
import { AddComment } from "@packages/posts/add-comment";
import { CommentList } from "@packages/posts/comment-list";
import { Styles } from "./Styles";

export const Comments: FC<Record<string, never>> = () => {
  return (
    <KeyboardAvoidingView behavior="height" style={Styles.container}>
      <FocusedPost />
      <CommentList />
      <AddComment />
    </KeyboardAvoidingView>
  );
};
