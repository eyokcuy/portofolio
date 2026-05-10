import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from './testimonial.entity';
import { TestimonialsEvents } from './testimonials.events';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private repo: Repository<Testimonial>,
    private readonly events: TestimonialsEvents,
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(data: Partial<Testimonial>) {
    const testimonial = this.repo.save(this.repo.create(data));
    Promise.resolve(testimonial)
      .then((t) =>
        this.events.emit('testimonial_changed', {
          type: 'created',
          testimonial: t,
        }),
      )
      .catch(() => undefined);

    return testimonial;
  }

  async patch(id: number, data: Partial<Testimonial>) {
    const testimonial = await this.repo.findOne({ where: { id } });
    if (!testimonial) throw new NotFoundException('Testimonial not found');

    this.repo.merge(testimonial, data);
    const saved = await this.repo.save(testimonial);

    this.events.emit('testimonial_changed', {
      type: 'updated',
      testimonial: saved,
    });
    return saved;
  }

  async remove(id: number) {
    const testimonial = await this.repo.findOne({ where: { id } });
    if (!testimonial) throw new NotFoundException('Testimonial not found');

    await this.repo.remove(testimonial);

    this.events.emit('testimonial_changed', { type: 'deleted', id });
    return { deleted: true, id };
  }
}
