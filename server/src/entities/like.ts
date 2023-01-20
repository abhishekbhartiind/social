import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { PostEntity as Post } from "./post";
import { UserEntity as User } from "./user";

@Entity()
export class Like {
    @Column()
    like: boolean;

    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, (user) => user.likes)
    user: User;

    @PrimaryColumn()
    postId: number;

    @ManyToOne(() => Post, (post) => post.likes, {
        onDelete: 'CASCADE'
    })
    post: Post;
}