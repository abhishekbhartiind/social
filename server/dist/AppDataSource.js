"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    database: 'instapets',
    username: 'serey',
    password: 'instapets',
    synchronize: true,
    entities: [Post_1.PostEntity, User_1.UserEntity],
    migrations: [path_1.default.join(__dirname, '/migrations/*')]
});
exports.default = AppDataSource;
//# sourceMappingURL=AppDataSource.js.map