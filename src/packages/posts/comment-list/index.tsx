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
  post_id: number;
  postIndex: number;
  comments: IComment[];
}

class CommentListComponent extends Component<Props> {
  private scroll = false;
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
    void PostComments.refreshComments(this.props.post_id);
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
      this.scroll = true;
    }
  }

  public override componentDidUpdate(pp: Props) {
    if (this.props.post_id !== pp.post_id) {
      void PostComments.refreshComments(this.props.post_id);
    }
    if (this.scroll) {
      this.scroll = false;
      this.scrollToEnd();
    }
  }

  private scrollToEnd() {
    this.UIView?.scrollToEnd({ animated: true });
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
          marginTop: index === 0 ? 15 : 0,
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

  private onInitialSize: undefined | (() => void) = () => {
    // this.UIView?.scrollToEnd({ animated: false });
    // this.onInitialSize = undefined;
  };

  render() {
    const { comments } = this.props;
    return (
      <Animated.FlatList
        data={comments}
        onContentSizeChange={this.onInitialSize}
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
    post_id: post.id,
  }))(CommentListComponent),
);
