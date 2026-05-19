import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stat } from './stat.entity';
import { StatsEvents } from './stats.events';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stat)
    private repo: Repository<Stat>,
    private readonly events: StatsEvents,
  ) {}

  findAll() {
    return this.repo.find({ order: { order: 'ASC' } });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async create(data: Partial<Stat>) {
    const stat = await this.repo.save(this.repo.create(data));
    this.events.emit('stats_changed', { type: 'created', stat });
    return stat;
  }

  async update(id: number, data: Partial<Stat>) {
    const stat = await this.repo.findOne({ where: { id } });
    if (!stat) throw new NotFoundException('Stat not found');
    this.repo.merge(stat, data);
    const saved = await this.repo.save(stat);
    this.events.emit('stats_changed', { type: 'updated', stat: saved });
    return saved;
  }

  async remove(id: number) {
    const stat = await this.repo.findOne({ where: { id } });
    if (!stat) throw new NotFoundException('Stat not found');
    await this.repo.remove(stat);
    this.events.emit('stats_changed', { type: 'deleted', id });
    return { deleted: true, id };
  }
}
