import React, { Component } from "react";
import { Animated, TextInput, TouchableOpacity, View } from "react-native";
import { Styles } from "./Styles";
import { Theme, UtilityStyles, basicInterpolator } from "@packages/styles";
import { connectCommentTransition } from "@packages/state/CommentTransition";
import type {
  CreateCommentMutationVariables,
  Mutation,
} from "@packages/graphql";
import { graphQLRequest } from "@packages/graphql";
import { CreateCommentMutation } from "@packages/graphql/queries/postComments.gql";
import { connectAuthentication } from "@packages/state/Authentication";
import { CommentStream } from "@packages/streams";
import { Up } from "@packages/icons/up";
import { Feed } from "@packages/state/Feed";
import { PostComments } from "@packages/state/PostComments";
import { Router } from "@figliolia/rn-navigation";

interface Props {
  user_id: number;
  post_id: number;
}

interface State {
  comment: string;
}

class AddCommentComponent extends Component<Props, State> {
  private TextInput?: TextInput;
  public state = { comment: "" };
  private animator = new Animated.Value(0);
  private timer: ReturnType<typeof setTimeout> | null = null;
  constructor(props: Props) {
    super(props);
    Router.registerExitTransition(this.exit.bind(this));
  }

  public override componentDidMount() {
    this.timer = setTimeout(() => {
      this.TextInput?.focus?.();
    }, 700);
    Animated.timing(this.animator, {
      toValue: 1,
      delay: 700,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  public override componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private exit() {
    return new Promise<void>(resolve => {
      Animated.timing(this.animator, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        resolve();
      });
    });
  }

  private setComment = (comment: string) => {
    this.setState({ comment });
  };

  private addComment = () => {
    const { comment } = this.state;
    if (!comment.length) {
      return;
    }
    const { user_id, post_id } = this.props;
    void graphQLRequest<
      Pick<Mutation, "createComment">,
      CreateCommentMutationVariables
    >({
      query: CreateCommentMutation,
      variables: {
        user_id,
        post_id,
        text: comment,
      },
    }).then(res => {
      const comment = res.data.createComment;
      CommentStream.emit("create-comment", comment);
      this.setComment("");
      Feed.addComment(post_id);
      PostComments.addComment(comment);
      this.TextInput?.clear?.();
    });
  };

  private cacheReference = (c: TextInput) => {
    this.TextInput = c;
  };

  render() {
    return (
      <Animated.View
        style={[
          Styles.container,
          {
            opacity: basicInterpolator(this.animator),
          },
        ]}>
        <View style={Styles.inputContainer}>
          <TextInput
            multiline
            inputMode="text"
            numberOfLines={3}
            enterKeyHint="done"
            style={Styles.input}
            placeholder="Comment"
            ref={this.cacheReference}
            value={this.state.comment}
            onChangeText={this.setComment}
            clearButtonMode="while-editing"
            onSubmitEditing={this.addComment}
            placeholderTextColor={Theme.GRAY_TEXT}
          />
          <View style={Styles.submit}>
            <TouchableOpacity
              onPress={this.addComment}
              style={[UtilityStyles.Fill, UtilityStyles.Center]}>
              <View style={Styles.up}>
                <Up color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }
}

export const AddComment = connectCommentTransition(({ post }) => ({
  post_id: post.id,
}))(connectAuthentication(({ id }) => ({ user_id: id }))(AddCommentComponent));
