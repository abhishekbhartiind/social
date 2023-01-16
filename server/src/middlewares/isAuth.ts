import { GraphQLError } from "graphql";
import { IMiddlewareResolver } from "graphql-middleware/dist/types";
import { MyContext } from "src/types/context";

const isAuth: IMiddlewareResolver<any, MyContext, any> = (
    resolve, parent, args, context, info
) => {
    if (!context.req.session.userId) {
        throw new GraphQLError("not authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
            }
        })
    }
    return resolve(parent, args, context, info);
}

export default isAuth;