import type { FC } from "react";
import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import type { Comment as IComment } from "@packages/graphql";
import { Styles } from "./Styles";
import { Heart } from "@packages/icons/heart";
import { Theme } from "@packages/styles";
import { useAuthenticationState } from "@packages/state/Authentication";

export const Comment: FC<{
  index: number;
  comment: IComment;
  styles?: StyleProp<ViewStyle>;
}> = ({ index, styles, comment }) => {
  const userID = useAuthenticationState(state => state.id);
  const userHasLiked = comment.likes.some(like => like.user_id === userID);
  return (
    <View style={[Styles.container, styles]}>
      <Text style={Styles.author}>{comment.created_by.name}</Text>
      <Text style={Styles.comment}>{comment.text}</Text>
      <TouchableOpacity style={Styles.likes}>
        <Text style={Styles.likesText}>{comment._count.likes}</Text>
        <View style={Styles.likesIcon}>
          <Heart
            fill={userHasLiked}
            color={userHasLiked ? Theme.HEART_RED : Theme.GRAY_TEXT}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
