import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddUploadEvent1600990594208 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('events', new TableColumn({
            name: 'photo',
            type: 'varchar',
            isNullable: true,
        }))
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('events', 'photo');
    }

}
