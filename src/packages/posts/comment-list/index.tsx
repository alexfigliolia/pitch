import React, { Component } from "react";
import type { ListRenderItemInfo } from "react-native";
import { Animated, LayoutAnimation } from "react-native";
import { Router } from "@figliolia/rn-navigation";
import type { Comment as IComment } from "@packages/graphql";
import { connectCommentTransition } from "@packages/state/CommentTransition";
import { Comment } from "@packages/posts/comment";
import { basicInterpolator } from "@packages/styles";
import {
  PostComments,
  connectPostComments,
} from "@packages/state/PostComments";
import { Styles } from "./Styles";

interface Props {
  ID: number;
  postIndex: number;
  comments: IComment[];
}

class CommentListComponent extends Component<Props> {
  private UIView?: Animated.FlatList;
  private animator = new Animated.Value(0);
  private static readonly transitionConfig = {
    ...LayoutAnimation.Presets.linear,
    duration: 200,
  };
  constructor(props: Props) {
    super(props);
    Router.registerExitTransition(this.exit.bind(this));
  }

  public override componentDidMount() {
    void PostComments.refreshComments(this.props.ID);
    Animated.timing(this.animator, {
      toValue: 1,
      delay: 800,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  public override UNSAFE_componentWillReceiveProps({ comments }: Props) {
    if (comments.length !== this.props.comments.length) {
      LayoutAnimation.configureNext(CommentListComponent.transitionConfig);
      void Promise.resolve().then(() => {
        this.UIView?.scrollToOffset({ animated: true, offset: 0 });
      });
    }
  }

  public override componentDidUpdate(pp: Props) {
    if (this.props.ID !== pp.ID) {
      void PostComments.refreshComments(this.props.ID);
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

  private renderItem = ({ index, item }: ListRenderItemInfo<IComment>) => {
    return (
      <Comment
        index={index}
        comment={item}
        key={item.id}
        styles={{
          marginTop: index === this.props.comments.length - 1 ? 15 : 0,
        }}
      />
    );
  };

  private cacheReference = (c: Animated.FlatList) => {
    this.UIView = c;
  };

  private extractItem = (comment: IComment) => {
    return comment.id.toString();
  };

  render() {
    const { comments } = this.props;
    return (
      <Animated.FlatList
        inverted
        data={comments}
        ref={this.cacheReference}
        renderItem={this.renderItem}
        keyExtractor={this.extractItem}
        contentContainerStyle={Styles.itemContainer}
        style={[
          Styles.scrollView,
          {
            opacity: basicInterpolator(this.animator),
          },
        ]}
      />
    );
  }
}

export const CommentList = connectPostComments(({ comments }) => ({
  comments,
}))(
  connectCommentTransition(({ postIndex, post }) => ({
    postIndex,
    ID: post.id,
  }))(CommentListComponent),
);
