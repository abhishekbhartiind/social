import { DataSource } from "typeorm";
import path from "path";
import { PostEntity as Post } from "./entities/post";
import { UserEntity as User } from "./entities/user";
import { Like } from "./entities/like";
import { CommentEntity as Comment } from "./entities/comment";
import { CommentLike } from "./entities/comment-like";
import dotenv from "dotenv";

dotenv.config();

const AppDataSource = new DataSource({
    type: 'postgres',
    // database: 'instapets',
    // username: 'serey',
    // password: 'instapets',
    url: process.env.DATABASE_URL,
    //synchronize: true,
    logging: true,
    entities: [Post, User, Like, Comment, CommentLike],
    migrations: [path.join(__dirname, '/migrations/*')]
});

export const dataManager = AppDataSource.manager;

export default AppDataSource;