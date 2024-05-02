import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { userRole } from "../enum/enum";
import { Product } from "src/product/entities/product.entity";

@Entity()
export class User extends Base {
    @Column()
    username:string;

    @Column()
    password:string;

    @Column({unique:true})
    email:string;

    @Column({
        type: 'enum',
        enum: userRole,
        default: userRole.member
    })
    role: userRole

    @OneToMany(()=>Product, (product)=>product.user,
    {eager:true, onDelete:'CASCADE'})
    product: Product []


}