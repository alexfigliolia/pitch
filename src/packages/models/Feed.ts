import { State } from "@figliolia/galena";
import type { Post } from "@packages/graphql";

export class FeedModel extends State<{
  feed: Post[];
}> {
  constructor() {
    super("Feed", {
      feed: [],
    });
  }

  public setFeed(feed: Post[]) {
    this.update(state => {
      state.feed = feed;
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
