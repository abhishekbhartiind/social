import { DataSource } from "typeorm";
import path from "path";
import { PostEntity as Post } from "./entities/Post";
import { UserEntity as User } from "./entities/User";

const AppDataSource = new DataSource({
    type: 'postgres',
    database: 'instapets',
    username: 'serey',
    password: 'instapets',
    synchronize: true,
    entities: [Post, User],
    migrations: [path.join(__dirname, '/migrations/*')]
});

export default AppDataSource;