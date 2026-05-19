import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { FeedbacksEvents } from './feedbacks.events';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private repo: Repository<Feedback>,
    private readonly events: FeedbacksEvents,
  ) {}

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async create(data: Partial<Feedback>) {
    const feedback = await this.repo.save(this.repo.create(data));
    this.events.emit('feedback_changed', { type: 'created', feedback });
    return feedback;
  }

  async update(id: number, data: Partial<Feedback>) {
    const feedback = await this.repo.findOne({ where: { id } });
    if (!feedback) throw new NotFoundException('Feedback not found');
    this.repo.merge(feedback, data);
    const saved = await this.repo.save(feedback);
    this.events.emit('feedback_changed', { type: 'updated', feedback: saved });
    return saved;
  }

  async remove(id: number) {
    const feedback = await this.repo.findOne({ where: { id } });
    if (!feedback) throw new NotFoundException('Feedback not found');
    await this.repo.remove(feedback);
    this.events.emit('feedback_changed', { type: 'deleted', id });
    return { deleted: true, id };
  }
}
