import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Stat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  num!: string; // e.g., "5+", "40+"

  @Column()
  label!: string; // e.g., "Years Experience", "Projects"

  @Column({ default: 0 })
  order!: number; // To maintain sorting

  @Column({ default: '#67e8f9' })
  accent!: string;
}
