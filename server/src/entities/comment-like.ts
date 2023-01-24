import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { CommentEntity as Comment } from "./comment";
import { UserEntity as User } from "./user";

@Entity()
export class CommentLike {
    @Column()
    like: boolean;

    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, (user) => user.likes)
    user: User;

    @PrimaryColumn()
    commentId: number;

    @ManyToOne(() => Comment, (comment) => comment.likes, {
        onDelete: 'CASCADE'
    })
    comment: Comment;
}