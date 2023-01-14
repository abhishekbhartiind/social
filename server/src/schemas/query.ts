import gql from "graphql-tag";

export default gql`
    type User @key(fields: "id", resolvable: false) {
        id: ID!
    }

    type Post @key(fields: "id", resolvable: false) {
        id: ID!
    }

    type Query {
        me(id: Int!): User
        post(id: Id!): Post
        posts: [Post!]!
    }
`;