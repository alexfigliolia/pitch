import { connect, createUseState } from "@figliolia/react-galena";
import { CommentTransitionModel } from "@packages/models/CommentTransition";

export const CommentTransition = new CommentTransitionModel();

export const connectCommentTransition = connect(CommentTransition);

export const useCommentTransition = createUseState(CommentTransition);
