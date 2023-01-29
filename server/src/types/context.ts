import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createCommentsArrayLoader, createRepliesArrayLoader } from "../utils/loaders/createCommentLoader";
import { 
    createCommentLikesArrayLoader, 
    createCommentUserLikeLoader 
} from "../utils/loaders/createCommentLikeLoader";
import {
    createPostLikesArrayLoader,
    createPostUserLikeLoader
} from "../utils/loaders/createPostLikeLoader";
import createUserLoader, { createUserPostCountLoader } from "../utils/loaders/createUserLoader";

export type MyContext = {
    req: Request,
    res: Response,
    redis: Redis,
    userLoader: ReturnType<typeof createUserLoader>,
    postLikesArrayLoader: ReturnType<typeof createPostLikesArrayLoader>,
    postUserLikeLoader: ReturnType<typeof createPostUserLikeLoader>,
    commentLikesArrayLoader: ReturnType<typeof createCommentLikesArrayLoader>,
    commentUserLikeLoader: ReturnType<typeof createCommentUserLikeLoader>,
    commentsArrayLoader: ReturnType<typeof createCommentsArrayLoader>,
    repliesArrayLoader: ReturnType<typeof createRepliesArrayLoader>,
    totalPostCountLoader: ReturnType<typeof createUserPostCountLoader>,
}
