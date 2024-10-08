import { Comment } from "src/comment/entities/comment.entity";
import { Base } from "src/entity/base.entity";
import { User } from "src/entity/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Product extends Base{
    @Column()
    name: string;

    @Column()
    description:string;

    
    @Column()
    brand:string;

    
    @Column()
    price:string;

   @ManyToOne(()=>User, (user)=>user.product)
   user: User; 

   @ManyToMany(()=>Comment, (comment)=>comment.product)
   @JoinTable()
   comment:Comment[]

   
   @Column()
   userId:number;
//   findProduct: { userComment: string; userId: number; product: Product[]; id: number; createdDate: Date; };
   
}
