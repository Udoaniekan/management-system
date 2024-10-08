import { Base } from "src/entity/base.entity"
import { Product } from "src/product/entities/product.entity"
import { Column, Entity, ManyToMany } from "typeorm"

@Entity()
export class Comment extends Base{
@Column()
userComment:string

@Column()
userId:number

@ManyToMany(()=>Product,(product)=>product.comment)
product:Product[]

}

