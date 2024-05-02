import { Base } from "src/entity/base.entity";
import { User } from "src/entity/user.entity";
import { Column, Entity, OneToMany } from "typeorm";

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

   @OneToMany(()=>User, (user)=>user.product)
   user: User; 
   
}
