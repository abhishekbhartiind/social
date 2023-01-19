import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity as Post } from "./post";
import { UserEntity as User } from "./user";

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    authorId: number;

    @ManyToOne(() => User, (user) => user.comments)
    author: User;

    @Column()
    postId: number;

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post;

    @ManyToOne(() => CommentEntity, (comment) => comment.children, {
        onDelete: 'CASCADE'
    })
    parent: CommentEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.parent)
    children: CommentEntity[];
}