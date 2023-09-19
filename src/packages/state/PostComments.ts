import { connect } from "@figliolia/react-galena";
import { PostCommentsModel } from "@packages/models/PostComment";

export const PostComments = new PostCommentsModel();

export const connectPostComments = connect(PostComments);
