import { Comment } from "src/comment/entities/comment.entity";
import { Base } from "src/entity/base.entity";
import { User } from "src/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Product extends Base {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    brand: string;

    @Column()
    price: string;

    @ManyToOne(() => User, (user) => user.product)
    user: User;

    @Column()
    userId: number;

    @OneToMany(() => Comment, (comment) => comment.product, { cascade: true })
    comments: Comment[];
}
