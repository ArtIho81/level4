import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllEntities1698133209927 implements MigrationInterface {
    name = 'CreateAllEntities1698133209927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "planets" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "rotation_period" character varying NOT NULL DEFAULT '', "orbital_period" character varying NOT NULL DEFAULT '', "diameter" character varying NOT NULL DEFAULT '', "climate" character varying NOT NULL DEFAULT '', "gravity" character varying NOT NULL DEFAULT '', "terrain" character varying NOT NULL DEFAULT '', "surface_water" character varying NOT NULL DEFAULT '', "population" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL DEFAULT 'localhost:3000/planets/', CONSTRAINT "UQ_70a170f032a2ca04a6ec6eb2d98" UNIQUE ("name"), CONSTRAINT "PK_d5fbc2513a6d4909fe31938b0fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "spaceships" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "model" character varying NOT NULL DEFAULT '', "manufacturer" character varying NOT NULL DEFAULT '', "cost_in_credits" character varying NOT NULL DEFAULT '', "length" character varying NOT NULL DEFAULT '', "max_atmosphering_speed" character varying NOT NULL DEFAULT '', "crew" character varying NOT NULL DEFAULT '', "passengers" character varying NOT NULL DEFAULT '', "cargo_capacity" character varying NOT NULL DEFAULT '', "consumables" character varying NOT NULL DEFAULT '', "hyperdrive_rating" character varying NOT NULL DEFAULT '', "MGLT" character varying NOT NULL DEFAULT '', "starship_class" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL DEFAULT 'localhost:3000/starships/', CONSTRAINT "UQ_3160c0465af56a532d7afa08df3" UNIQUE ("name"), CONSTRAINT "PK_77be88e73cae962e8f3e6b2f764" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "species" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "classification" character varying NOT NULL DEFAULT '', "designation" character varying NOT NULL DEFAULT '', "average_height" character varying NOT NULL DEFAULT '', "skin_colors" character varying NOT NULL DEFAULT '', "hair_colors" character varying NOT NULL DEFAULT '', "eye_colors" character varying NOT NULL DEFAULT '', "average_lifespan" character varying NOT NULL DEFAULT '', "language" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL DEFAULT 'localhost:3000/species/', "homeworldId" integer, CONSTRAINT "UQ_1adf701cac3b2c0f8bacb54774b" UNIQUE ("name"), CONSTRAINT "REL_3427f7c92316561d7131c296bc" UNIQUE ("homeworldId"), CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "model" character varying NOT NULL DEFAULT '', "manufacturer" character varying NOT NULL DEFAULT '', "cost_in_credits" character varying NOT NULL DEFAULT '', "length" character varying NOT NULL DEFAULT '', "max_atmosphering_speed" character varying NOT NULL DEFAULT '', "crew" character varying NOT NULL DEFAULT '', "passengers" character varying NOT NULL DEFAULT '', "cargo_capacity" character varying NOT NULL DEFAULT '', "consumables" character varying NOT NULL DEFAULT '', "vehicle_class" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL DEFAULT 'localhost:3000/vehicles/', CONSTRAINT "UQ_aa397b791341ed3615397050d4b" UNIQUE ("name"), CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "people" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "height" character varying NOT NULL DEFAULT '', "mass" character varying NOT NULL DEFAULT '', "hair_color" character varying NOT NULL DEFAULT '', "skin_color" character varying NOT NULL DEFAULT '', "eye_color" character varying NOT NULL DEFAULT '', "birth_year" character varying NOT NULL DEFAULT '', "gender" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL DEFAULT 'localhost:3000/people/', "homeworldId" integer, CONSTRAINT "UQ_e7ec00b080e693706a6eaa6d317" UNIQUE ("name"), CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "films" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "episode_id" integer NOT NULL DEFAULT '0', "opening_crawl" text NOT NULL, "director" character varying NOT NULL DEFAULT '', "producer" character varying NOT NULL DEFAULT '', "release_date" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL DEFAULT 'localhost:3000/films/', CONSTRAINT "UQ_ef6e0245decf772d1dd66f158ae" UNIQUE ("title"), CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, "url" character varying NOT NULL, "peopleId" integer, "filmsId" integer, "speciesId" integer, "planetsId" integer, "starshipsId" integer, "vehiclesId" integer, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'USER', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "people_films_films" ("peopleId" integer NOT NULL, "filmsId" integer NOT NULL, CONSTRAINT "PK_a42b8c227444fd500c1b78979da" PRIMARY KEY ("peopleId", "filmsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_be3d4bf0a2a829c091594359de" ON "people_films_films" ("peopleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_80ce66926f5e215472c235a3a6" ON "people_films_films" ("filmsId") `);
        await queryRunner.query(`CREATE TABLE "people_species_species" ("peopleId" integer NOT NULL, "speciesId" integer NOT NULL, CONSTRAINT "PK_a9367442a2f340b0f020cd592b0" PRIMARY KEY ("peopleId", "speciesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d6d545e4740ee652e6f79e9ffd" ON "people_species_species" ("peopleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9232984d4ee14342ad97f44382" ON "people_species_species" ("speciesId") `);
        await queryRunner.query(`CREATE TABLE "people_vehicles_vehicles" ("peopleId" integer NOT NULL, "vehiclesId" integer NOT NULL, CONSTRAINT "PK_69addbf10105a9276f277fae411" PRIMARY KEY ("peopleId", "vehiclesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a7b8cbe95c602d58ade9845ce6" ON "people_vehicles_vehicles" ("peopleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f872d6f9465604601135f41970" ON "people_vehicles_vehicles" ("vehiclesId") `);
        await queryRunner.query(`CREATE TABLE "people_starships_spaceships" ("peopleId" integer NOT NULL, "spaceshipsId" integer NOT NULL, CONSTRAINT "PK_45a87570a7e7a6ab3fcaecbf461" PRIMARY KEY ("peopleId", "spaceshipsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e12e96481f77e75d06d439fee5" ON "people_starships_spaceships" ("peopleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a010e735e86fd0e53204bfb865" ON "people_starships_spaceships" ("spaceshipsId") `);
        await queryRunner.query(`CREATE TABLE "films_planets_planets" ("filmsId" integer NOT NULL, "planetsId" integer NOT NULL, CONSTRAINT "PK_a5a8f53f9e8b8e7a870dc8a6160" PRIMARY KEY ("filmsId", "planetsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_59f34f486757575a016c375061" ON "films_planets_planets" ("filmsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_956e9e10fd96ed618538bb2b96" ON "films_planets_planets" ("planetsId") `);
        await queryRunner.query(`CREATE TABLE "films_starships_spaceships" ("filmsId" integer NOT NULL, "spaceshipsId" integer NOT NULL, CONSTRAINT "PK_341849f5639aa766df117a5fb8e" PRIMARY KEY ("filmsId", "spaceshipsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6d36f8a4e33215c13a8aa2ffb3" ON "films_starships_spaceships" ("filmsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f6a323edb0687604567230b5af" ON "films_starships_spaceships" ("spaceshipsId") `);
        await queryRunner.query(`CREATE TABLE "films_species_species" ("filmsId" integer NOT NULL, "speciesId" integer NOT NULL, CONSTRAINT "PK_b16e4a6a250dfe1872c561203d0" PRIMARY KEY ("filmsId", "speciesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_be1d816ce6bdc4677080067eb4" ON "films_species_species" ("filmsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6042e3f9819bb64e4264509f73" ON "films_species_species" ("speciesId") `);
        await queryRunner.query(`CREATE TABLE "films_vehicles_vehicles" ("filmsId" integer NOT NULL, "vehiclesId" integer NOT NULL, CONSTRAINT "PK_78db1bf247c879baf20c6c9c2af" PRIMARY KEY ("filmsId", "vehiclesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_21c53d0d80b975c872a4ca4ada" ON "films_vehicles_vehicles" ("filmsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a623eaa88213329f69118cdea5" ON "films_vehicles_vehicles" ("vehiclesId") `);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_3427f7c92316561d7131c296bc6" FOREIGN KEY ("homeworldId") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people" ADD CONSTRAINT "FK_8f79bb098a482fa585da15ef3a6" FOREIGN KEY ("homeworldId") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_7aaee71fd817df85dd0e24d52a6" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_0dc8a31ea91d9fe7574c9c6b48c" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_c02a4e67aceb74f955901a6464a" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_fa13320ccbde4efa91048a55ff4" FOREIGN KEY ("planetsId") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_53ea6b0269e66436dfe00628f31" FOREIGN KEY ("starshipsId") REFERENCES "spaceships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_0ac1a8463eba3c1ce97f04ac097" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people_films_films" ADD CONSTRAINT "FK_be3d4bf0a2a829c091594359de7" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_films_films" ADD CONSTRAINT "FK_80ce66926f5e215472c235a3a61" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people_species_species" ADD CONSTRAINT "FK_d6d545e4740ee652e6f79e9ffd5" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_species_species" ADD CONSTRAINT "FK_9232984d4ee14342ad97f443824" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people_vehicles_vehicles" ADD CONSTRAINT "FK_a7b8cbe95c602d58ade9845ce63" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_vehicles_vehicles" ADD CONSTRAINT "FK_f872d6f9465604601135f419704" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people_starships_spaceships" ADD CONSTRAINT "FK_e12e96481f77e75d06d439fee55" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_starships_spaceships" ADD CONSTRAINT "FK_a010e735e86fd0e53204bfb865f" FOREIGN KEY ("spaceshipsId") REFERENCES "spaceships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_planets_planets" ADD CONSTRAINT "FK_59f34f486757575a016c3750616" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_planets_planets" ADD CONSTRAINT "FK_956e9e10fd96ed618538bb2b96c" FOREIGN KEY ("planetsId") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_starships_spaceships" ADD CONSTRAINT "FK_6d36f8a4e33215c13a8aa2ffb36" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_starships_spaceships" ADD CONSTRAINT "FK_f6a323edb0687604567230b5af4" FOREIGN KEY ("spaceshipsId") REFERENCES "spaceships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_species_species" ADD CONSTRAINT "FK_be1d816ce6bdc4677080067eb4b" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_species_species" ADD CONSTRAINT "FK_6042e3f9819bb64e4264509f73e" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_vehicles_vehicles" ADD CONSTRAINT "FK_21c53d0d80b975c872a4ca4ada3" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_vehicles_vehicles" ADD CONSTRAINT "FK_a623eaa88213329f69118cdea5d" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "films_vehicles_vehicles" DROP CONSTRAINT "FK_a623eaa88213329f69118cdea5d"`);
        await queryRunner.query(`ALTER TABLE "films_vehicles_vehicles" DROP CONSTRAINT "FK_21c53d0d80b975c872a4ca4ada3"`);
        await queryRunner.query(`ALTER TABLE "films_species_species" DROP CONSTRAINT "FK_6042e3f9819bb64e4264509f73e"`);
        await queryRunner.query(`ALTER TABLE "films_species_species" DROP CONSTRAINT "FK_be1d816ce6bdc4677080067eb4b"`);
        await queryRunner.query(`ALTER TABLE "films_starships_spaceships" DROP CONSTRAINT "FK_f6a323edb0687604567230b5af4"`);
        await queryRunner.query(`ALTER TABLE "films_starships_spaceships" DROP CONSTRAINT "FK_6d36f8a4e33215c13a8aa2ffb36"`);
        await queryRunner.query(`ALTER TABLE "films_planets_planets" DROP CONSTRAINT "FK_956e9e10fd96ed618538bb2b96c"`);
        await queryRunner.query(`ALTER TABLE "films_planets_planets" DROP CONSTRAINT "FK_59f34f486757575a016c3750616"`);
        await queryRunner.query(`ALTER TABLE "people_starships_spaceships" DROP CONSTRAINT "FK_a010e735e86fd0e53204bfb865f"`);
        await queryRunner.query(`ALTER TABLE "people_starships_spaceships" DROP CONSTRAINT "FK_e12e96481f77e75d06d439fee55"`);
        await queryRunner.query(`ALTER TABLE "people_vehicles_vehicles" DROP CONSTRAINT "FK_f872d6f9465604601135f419704"`);
        await queryRunner.query(`ALTER TABLE "people_vehicles_vehicles" DROP CONSTRAINT "FK_a7b8cbe95c602d58ade9845ce63"`);
        await queryRunner.query(`ALTER TABLE "people_species_species" DROP CONSTRAINT "FK_9232984d4ee14342ad97f443824"`);
        await queryRunner.query(`ALTER TABLE "people_species_species" DROP CONSTRAINT "FK_d6d545e4740ee652e6f79e9ffd5"`);
        await queryRunner.query(`ALTER TABLE "people_films_films" DROP CONSTRAINT "FK_80ce66926f5e215472c235a3a61"`);
        await queryRunner.query(`ALTER TABLE "people_films_films" DROP CONSTRAINT "FK_be3d4bf0a2a829c091594359de7"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_0ac1a8463eba3c1ce97f04ac097"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_53ea6b0269e66436dfe00628f31"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_fa13320ccbde4efa91048a55ff4"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_c02a4e67aceb74f955901a6464a"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_0dc8a31ea91d9fe7574c9c6b48c"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_7aaee71fd817df85dd0e24d52a6"`);
        await queryRunner.query(`ALTER TABLE "people" DROP CONSTRAINT "FK_8f79bb098a482fa585da15ef3a6"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_3427f7c92316561d7131c296bc6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a623eaa88213329f69118cdea5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21c53d0d80b975c872a4ca4ada"`);
        await queryRunner.query(`DROP TABLE "films_vehicles_vehicles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6042e3f9819bb64e4264509f73"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be1d816ce6bdc4677080067eb4"`);
        await queryRunner.query(`DROP TABLE "films_species_species"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f6a323edb0687604567230b5af"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6d36f8a4e33215c13a8aa2ffb3"`);
        await queryRunner.query(`DROP TABLE "films_starships_spaceships"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_956e9e10fd96ed618538bb2b96"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_59f34f486757575a016c375061"`);
        await queryRunner.query(`DROP TABLE "films_planets_planets"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a010e735e86fd0e53204bfb865"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e12e96481f77e75d06d439fee5"`);
        await queryRunner.query(`DROP TABLE "people_starships_spaceships"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f872d6f9465604601135f41970"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a7b8cbe95c602d58ade9845ce6"`);
        await queryRunner.query(`DROP TABLE "people_vehicles_vehicles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9232984d4ee14342ad97f44382"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d6d545e4740ee652e6f79e9ffd"`);
        await queryRunner.query(`DROP TABLE "people_species_species"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_80ce66926f5e215472c235a3a6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be3d4bf0a2a829c091594359de"`);
        await queryRunner.query(`DROP TABLE "people_films_films"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "films"`);
        await queryRunner.query(`DROP TABLE "people"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TABLE "species"`);
        await queryRunner.query(`DROP TABLE "spaceships"`);
        await queryRunner.query(`DROP TABLE "planets"`);
    }

}
