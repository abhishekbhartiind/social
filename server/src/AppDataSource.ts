import { DataSource } from "typeorm";
import path from "path";
import { PostEntity as Post } from "./entities/post";
import { UserEntity as User } from "./entities/user";
import { Like } from "./entities/like";

const AppDataSource = new DataSource({
    type: 'postgres',
    database: 'instapets',
    username: 'serey',
    password: 'instapets',
    synchronize: true,
    logging: true,
    entities: [Post, User, Like],
    migrations: [path.join(__dirname, '/migrations/*')]
});

export const dataManager = AppDataSource.manager;

export default AppDataSource;