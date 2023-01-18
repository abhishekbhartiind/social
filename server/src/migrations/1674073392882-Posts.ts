import { MigrationInterface, QueryRunner } from "typeorm";

export class Posts1674073392882 implements MigrationInterface {
    name = 'Posts1674073392882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "mpath"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "mpath" character varying DEFAULT ''`);
    }

}
