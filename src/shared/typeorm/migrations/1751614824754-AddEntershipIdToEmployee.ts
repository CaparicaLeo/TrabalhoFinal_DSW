import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddEntershipIdToEmployee1751614824754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'employees',
            new TableColumn({
                name: 'enterprise_id', type: 'uuid'
            }),
        );

        await queryRunner.createForeignKey(
            'employees',
            new TableForeignKey({
                columnNames: ['enterprise_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'enterprises',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'employees', 'enterprise_id');
        await queryRunner.dropColumn('employees', 'enterprise_id');
    }

}
