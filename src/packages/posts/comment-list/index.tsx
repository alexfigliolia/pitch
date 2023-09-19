import React, { Component } from "react";
import type { ListRenderItemInfo } from "react-native";
import { Animated, Dimensions, LayoutAnimation } from "react-native";
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
  height: number;
  comments: IComment[];
}

interface State {
  offsetHeight: number;
}

class CommentListComponent extends Component<Props, State> {
  private UIView?: Animated.FlatList;
  private animator = new Animated.Value(0);
  public state: State = { offsetHeight: 0 };
  private static readonly transitionConfig = {
    ...LayoutAnimation.Presets.linear,
    duration: 200,
  };
  constructor(props: Props) {
    super(props);
    Router.registerExitTransition(this.exit.bind(this));
  }

  public override componentDidMount() {
    void PostComments.refresh(this.props.ID);
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
      void PostComments.refresh(this.props.ID);
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
    return <Comment index={index} comment={item} key={item.id} />;
  };

  private cacheReference = (c: Animated.FlatList) => {
    this.UIView = c;
  };

  private extractItem = (comment: IComment) => {
    return comment.id.toString();
  };

  render() {
    const { height, comments } = this.props;
    const { offsetHeight } = this.state;
    const maxHeight =
      Dimensions.get("screen").height -
      (this.props.height * 1.1 + offsetHeight + 100);
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
            maxHeight,
            height: maxHeight,
            marginTop: height * 1.1,
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
  connectCommentTransition(({ post, height }) => ({
    ID: post.id,
    height,
  }))(CommentListComponent),
);
