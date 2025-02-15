import { Base } from "src/entity/base.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Comment extends Base {
    @Column()
    userComment: string;

    @Column()
    userId: number;

    @ManyToOne(() => Product, (product) => product.comments, { onDelete: "CASCADE" })
    product: Product;

    @Column()
    productId: number;
}
