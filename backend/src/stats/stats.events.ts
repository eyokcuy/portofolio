import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { Stat } from './stat.entity';

export type StatsEventPayload = {
  type: 'created' | 'updated' | 'deleted' | 'project_count_changed';
  stat?: Stat;
  id?: number;
  count?: number;
};

@Injectable()
export class StatsEvents extends EventEmitter {
  emit(event: 'stats_changed', payload: StatsEventPayload): boolean {
    return super.emit(event, payload);
  }

  on(
    event: 'stats_changed',
    listener: (payload: StatsEventPayload) => void,
  ): this {
    return super.on(event, listener);
  }

  off(
    event: 'stats_changed',
    listener: (payload: StatsEventPayload) => void,
  ): this {
    return super.off(event, listener);
  }
}
