import {MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CriarLikes1600979221689 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'likes',
                columns: [
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'event_id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                ],
            }),
        );
        await queryRunner.createForeignKey(
            'likes',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        );
        await queryRunner.createForeignKey(
            'likes',
            new TableForeignKey({
                columnNames: ['event_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'events',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('likes');
    } 
}

