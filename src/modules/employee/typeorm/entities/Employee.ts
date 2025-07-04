import Enterprise from "@modules/enterprise/typeorm/entities/Enterprise";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('employees')
export default class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(() => Enterprise)
    @JoinColumn({ name: 'enterprise_id' })
    enterprise: Enterprise;

    @Column()
    enterprise_id: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    position: string;
    @Column('decimal')
    salary: number;
    @Column({ type: 'date' })
    date_contracted: Date;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}