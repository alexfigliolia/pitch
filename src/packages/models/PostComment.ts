import { State } from "@figliolia/galena";
import type { Query, PostCommentsQueryVariables } from "@packages/graphql";
import { graphQLRequest, type Comment } from "@packages/graphql";
import { PostCommentsQuery } from "@packages/graphql/queries/postComments.gql";

interface IPostComments {
  comments: Comment[];
}

export class PostCommentsModel extends State<IPostComments> {
  constructor() {
    super("Post Comments", {
      comments: [],
    });
  }
  public setComments(comments: Comment[]) {
    this.update(state => {
      state.comments = comments;
    });
  }

  public async refreshComments(post_id: number) {
    const response = await graphQLRequest<
      Pick<Query, "postComments">,
      PostCommentsQueryVariables
    >({
      query: PostCommentsQuery,
      variables: { post_id },
    });
    this.setComments(response.data.postComments);
  }

  public addComment(comment: Comment) {
    this.update(state => {
      state.comments = [...state.comments, comment];
    });
  }
}
