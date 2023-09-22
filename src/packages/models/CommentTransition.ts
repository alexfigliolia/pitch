import { State } from "@figliolia/galena";
import { Visibility, type Post } from "@packages/graphql";
import { Feed } from "@packages/state/Feed";
import { ProfileFeed } from "@packages/state/ProfileFeed";
import type { ITransitionState } from "./types";

export class CommentTransitionModel extends State<ITransitionState> {
  private feedListener: string;
  private profileListener: string;
  constructor() {
    super("Comment Transition", {
      X: 0,
      Y: 0,
      height: 0,
      postIndex: -1,
      post: CommentTransitionModel.emptyPost,
    });
    this.feedListener = Feed.subscribe(this.onFeedUpdate);
    this.profileListener = ProfileFeed.subscribe(this.onFeedUpdate);
  }

  public set(nextState: ITransitionState) {
    this.update(state => {
      state.X = nextState.X;
      state.Y = nextState.Y;
      state.post = nextState.post;
      state.height = nextState.height;
      state.postIndex = nextState.postIndex;
    });
  }

  public resetIndex() {
    return this.update(state => {
      state.postIndex = -1;
    });
  }

  public clear() {
    this.update(state => {
      state.X = 0;
      state.Y = 0;
      state.height = 0;
      state.postIndex = -1;
      state.post = CommentTransitionModel.emptyPost;
    });
  }

  public destroy() {
    Feed.unsubscribe(this.feedListener);
    ProfileFeed.unsubscribe(this.profileListener);
  }

  private onFeedUpdate = (feedState: (typeof Feed)["state"]) => {
    this.update(state => {
      state.post =
        feedState.feed[state.postIndex] || CommentTransitionModel.emptyPost;
    });
  };

  private static get emptyPost(): Post {
    return {
      __typename: "Post",
      _count: {
        __typename: "PostStats",
        comments: 0,
        likes: 0,
      },
      created_at: "",
      /** Author */
      created_by: {
        __typename: "user",
        email: "",
        id: -1,
        name: "",
        image: "",
        verified: false,
      },
      id: -1,
      tags: [],
      text: "",
      title: "",
      visibility: Visibility.Friends,
    };
  }
}
