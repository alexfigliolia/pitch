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
      const update = state.feed[index];
      update._count.comments++;
      state.feed = [...beginning, update, ...end];
    });
  }

  public likePost(index: number, nextValue = 1) {
    const { feed } = this.getState();
    const item = feed[index];
    if (!item) {
      return;
    }
    const newItem = { ...item };
    newItem._count.likes = newItem._count.likes + nextValue;
    const nextState = [...feed];
    nextState[index] = newItem;
    this.update(state => {
      state.feed = nextState;
    });
  }
}
