import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('feedbacks')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  role: string;

  @Column('text')
  text: string;

  @Column({ default: 5 })
  rating: number;

  @Column({ default: '#67e8f9' })
  accent: string;

  @CreateDateColumn()
  createdAt: Date;
}
