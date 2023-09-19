import { EventEmitter } from "@figliolia/event-emitter";
import type { CommentMessages } from "./types";

export const CommentStream = new EventEmitter<CommentMessages>();
