import isAuth from "./isAuth";

export const postMiddleware = {
    Mutation: {
        createPost: isAuth,
        updatePost: isAuth,
        deletePost: isAuth,
    }
}