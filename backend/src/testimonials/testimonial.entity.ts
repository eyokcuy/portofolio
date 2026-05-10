import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Testimonial {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  role!: string;

  @Column('text')
  text!: string;

  @Column({ default: 5 })
  rating!: number;

  @Column({ default: 'bg-cyan-300' })
  accent!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}
