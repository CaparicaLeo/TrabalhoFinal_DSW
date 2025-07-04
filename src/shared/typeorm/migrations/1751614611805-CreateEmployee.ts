import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmployee1751614611805 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'employees',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name: 'position',
                        type: 'varchar'
                    },
                    {
                        name: 'salary',
                        type: 'decimal'
                    },
                    {
                        name: "date_contracted",
                        type: 'date'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
