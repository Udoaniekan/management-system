import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Base{
    @PrimaryGeneratedColumn()
    id: number; 

    @CreateDateColumn()
    createdDate:Date
}