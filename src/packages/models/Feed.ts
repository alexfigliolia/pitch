import { State } from "@figliolia/galena";
import type { Post } from "@packages/graphql";

export class FeedModel extends State<{ feed: Post[] }> {
  constructor() {
    super("Feed", { feed: [] });
  }

  public setFeed(feed: Post[]) {
    this.update(state => {
      state.feed = feed;
    });
  }

  public addComment(postID: number) {
    const index = this.getState().feed.findIndex(item => item.id === postID);
    if (index === -1) {
      return;
    }
    this.update(state => {
      const beginning = state.feed.slice(0, index);
      const end = state.feed.slice(index + 1);
      const update = { ...state.feed[index] };
      update._count.comments++;
      state.feed = [...beginning, update, ...end];
    });
  }

  public likePost(ID: number, increment: 1 | -1) {
    const { feed } = this.getState();
    const postIndex = feed.findIndex(post => post.id === ID);
    const post = feed[postIndex];
    if (!post) {
      return;
    }
    const newItem = { ...post };
    newItem._count.likes = newItem._count.likes + increment;
    const nextState = [...feed];
    nextState[postIndex] = newItem;
    this.update(state => {
      state.feed = nextState;
    });
  }
}
