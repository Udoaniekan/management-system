import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";
import { userRole } from "src/enum/enum";

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


}