import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('enterprises')
export default class Enterprise {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string
    @Column()
    cnpj: string
    @Column()
    address: string
    @Column()
    telephone: string
    @Column()
    actvity_branch: string
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}