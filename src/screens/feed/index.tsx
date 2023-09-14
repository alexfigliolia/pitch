import React, { Component } from "react";
import type { ListRenderItemInfo } from "react-native";
import { FlatList, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { Post, Query, QueryFeedArgs } from "@packages/graphql";
import { graphQLRequest } from "@packages/graphql";
import { feedQuery } from "@packages/graphql/queries/feed.gql";
import { Feed as FeedState, connectFeed } from "@packages/state/Feed";
import { Authentication } from "@packages/state/Authentication";
import { PostTile } from "@packages/components/post-tile";
import { AddPost } from "@packages/components/add-post";
import { Styles } from "./Styles";

interface State {
  error: string;
  loading: boolean;
  startIndex: number;
}

interface Props {
  feed: Post[];
  navigation?: NativeStackNavigationProp<Record<string, object | undefined>>;
}

class FeedComponent extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = { startIndex: 0, error: "", loading: true };
  }

  componentDidMount() {
    void this.fetchFeed();
  }

  private async fetchFeed(startIndex = 0) {
    try {
      const response = await graphQLRequest<Pick<Query, "feed">, QueryFeedArgs>(
        {
          query: feedQuery,
          variables: {
            startIndex,
            id: Authentication.getState().id,
          },
        },
      );
      FeedState.setFeed(response.data.feed);
      this.setState({ loading: false });
    } catch (error: any) {
      this.setState({ error: error.message, loading: false });
    }
  }

  private renderItem = ({ index, item }: ListRenderItemInfo<Post>) => {
    return <PostTile post={item} index={index} />;
  };

  render() {
    return (
      <View style={Styles.feed}>
        <FlatList
          data={this.props.feed}
          style={Styles.scrollView}
          renderItem={this.renderItem}
          contentContainerStyle={Styles.itemContainer}
        />
        <AddPost />
      </View>
    );
  }
}

export const Feed = connectFeed(({ feed }) => ({ feed }))(FeedComponent);
