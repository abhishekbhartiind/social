import { MigrationInterface, QueryRunner } from "typeorm";

export class Posts1673845828058 implements MigrationInterface {
    name = 'Posts1673845828058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_entity" ADD "creatorId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post_entity" ADD CONSTRAINT "FK_0a71fd0ee517063eb237e373fce" FOREIGN KEY ("creatorId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_entity" DROP CONSTRAINT "FK_0a71fd0ee517063eb237e373fce"`);
        await queryRunner.query(`ALTER TABLE "post_entity" DROP COLUMN "creatorId"`);
    }

}
