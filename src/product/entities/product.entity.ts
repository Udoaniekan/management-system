import { Base } from "src/entity/base.entity";
import { Column, Entity } from "typeorm";

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

    
   
}
