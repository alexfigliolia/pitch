import type { AddPostLikeMutationVariables, Mutation } from "@packages/graphql";
import { graphQLRequest } from "@packages/graphql";
import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Styles } from "./Styles";
import { Theme } from "@packages/styles";
import {
  addPostLikeMutation,
  removePostLikeMutation,
} from "@packages/graphql/queries/posts.gql";
import { Authentication } from "@packages/state/Authentication";
import { Feed as FeedState } from "@packages/state/Feed";
import { Heart } from "@packages/icons/heart";
import { Comment } from "@packages/icons/comment";
import type { Props, State } from "./types";

export class PostTile extends Component<Props, State> {
  public state: State;
  constructor(props: Props) {
    super(props);
    this.state = { liked: props.post._count.likes === 1 };
  }

  private onPress = () => {
    if (this.state.liked) {
      void this.unlike();
    } else {
      void this.like();
    }
  };

  private like = this.GQL(addPostLikeMutation);

  private unlike = this.GQL(removePostLikeMutation, -1);

  private GQL(query: string, target: 1 | -1 = 1) {
    return async () => {
      await graphQLRequest<
        Pick<Mutation, "addPostLike">,
        AddPostLikeMutationVariables
      >({
        query,
        variables: {
          post_id: this.props.post.id,
          user_id: Authentication.getState().id,
        },
      });
      FeedState.likePost(this.props.index, target);
      this.setState({ liked: target === 1 });
    };
  }

  render() {
    const { liked } = this.state;
    const { post } = this.props;
    return (
      <View style={Styles.container}>
        <View style={Styles.content}>
          <View style={Styles.title}>
            <Text style={Styles.titleText}>{post.title}</Text>
          </View>
          <View style={Styles.description}>
            <Text style={Styles.descriptionText} numberOfLines={2}>
              {post.text}
            </Text>
          </View>
          <View style={Styles.footer}>
            <TouchableOpacity
              onPress={this.onPress}
              style={Styles.footerAction}>
              <Text style={Styles.actionText}>{post._count.likes}</Text>
              <View style={Styles.actionIcon}>
                <Heart
                  fill={liked}
                  color={liked ? Theme.HEART_RED : Theme.GRAY_TEXT}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.footerAction}>
              <Text style={Styles.actionText}>{post._count.comments}</Text>
              <View style={Styles.actionIcon}>
                <Comment
                  fill={liked}
                  color={liked ? Theme.CORE_BLUE : Theme.GRAY_TEXT}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
