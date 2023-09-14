import { connect } from "@figliolia/react-galena";
import { FeedModel } from "@packages/models/Feed";

export const Feed = new FeedModel();

export const connectFeed = connect(Feed);
