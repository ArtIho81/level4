import { Films } from '../films/films.entity';
import { People } from '../people/people.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Species } from '../species/species.entity';
import { Planets } from '../planets/planets.entity';
import { Spaceships } from '../spaceships/spaceships.entity';
import { Vehicles } from '../vehicles/vehicles.entity';

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  url: string

  @ManyToOne(() => People, (people) => people.images)
  people: People;

  @ManyToOne(() => Films, (films) => films.images)
  films: Films;

  @ManyToOne(() => Species, (species) => species.images)
  species: Species;

  @ManyToOne(() => Planets, (planets) => planets.images)
  planets: Planets;

  @ManyToOne(() => Spaceships, (starships) => starships.images)
  starships: Spaceships;

  @ManyToOne(() => Vehicles, (vehicles) => vehicles.images)
  vehicles: Vehicles;
}
