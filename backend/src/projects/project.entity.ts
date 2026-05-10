import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column()
  color!: string;

  @Column({ nullable: true })
  liveUrl?: string;

  @Column({ nullable: true })
  githubUrl?: string;

  @Column({ nullable: true, type: 'text' })
  imageUrl?: string;

  @Column('simple-json', { nullable: true })
  techStack?: string[];

  @Column({ default: 'Live' })
  status!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}
