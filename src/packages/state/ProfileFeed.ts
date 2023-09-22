import { connect } from "@figliolia/react-galena";
import { FeedModel } from "@packages/models/Feed";

export const ProfileFeed = new FeedModel();

export const connectProfileFeed = connect(ProfileFeed);
