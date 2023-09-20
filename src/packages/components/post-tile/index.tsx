import React, { Component } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { Router } from "@figliolia/rn-navigation";
import type { AddPostLikeMutationVariables, Mutation } from "@packages/graphql";
import { graphQLRequest } from "@packages/graphql";
import { Theme } from "@packages/styles";
import {
  addPostLikeMutation,
  removePostLikeMutation,
} from "@packages/graphql/queries/posts.gql";
import { Authentication } from "@packages/state/Authentication";
import { Feed as FeedState } from "@packages/state/Feed";
import { Heart } from "@packages/icons/heart";
import { Comment } from "@packages/icons/comment";
import { CommentTransition } from "@packages/state/CommentTransition";
import type { Props } from "./types";
import { Styles } from "./Styles";

export class PostTile extends Component<Props> {
  private UIView?: View;

  static defaultProps = {
    style: {},
    titleStyle: {},
    descriptionStyle: {},
  };

  private likeOrUnlike = () => {
    if (this.props.post._count.likes === 1) {
      void this.unlike();
    } else {
      void this.like();
    }
  };

  private transitionToComment = () => {
    if (Router.currentRoute === "comments") {
      return;
    }
    this.UIView?.measure((_1, _2, _3, height, pageX, pageY) => {
      CommentTransition.set({
        height,
        X: pageX,
        Y: pageY,
        postIndex: this.props.index,
      });
      Router.navigate("comments");
    });
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
    };
  }

  private cacheReference = (c: View) => {
    this.UIView = c;
  };

  private get liked() {
    return this.props.post._count.likes === 1;
  }

  render() {
    const { post, style, titleStyle, descriptionStyle } = this.props;
    return (
      <Animated.View
        style={[Styles.container, style]}
        ref={this.cacheReference}>
        <View style={Styles.content}>
          <View style={Styles.title}>
            <Animated.Text style={[Styles.titleText, titleStyle]}>
              {post.title}
            </Animated.Text>
          </View>
          <View style={Styles.description}>
            <Animated.Text
              style={[Styles.descriptionText, descriptionStyle]}
              numberOfLines={2}>
              {post.text}
            </Animated.Text>
          </View>
          <View style={Styles.footer}>
            <TouchableOpacity
              onPress={this.likeOrUnlike}
              style={Styles.footerAction}>
              <Text style={Styles.actionText}>{post._count.likes}</Text>
              <View style={Styles.actionIcon}>
                <Heart
                  fill={this.liked}
                  color={this.liked ? Theme.HEART_RED : Theme.GRAY_TEXT}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.footerAction}
              onPress={this.transitionToComment}>
              <Text style={Styles.actionText}>{post._count.comments}</Text>
              <View style={Styles.actionIcon}>
                <Comment
                  fill={!!post._count.comments}
                  color={
                    post._count.comments ? Theme.CORE_BLUE : Theme.GRAY_TEXT
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }
}
