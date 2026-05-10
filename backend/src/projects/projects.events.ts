import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';

export type ProjectsEventPayload =
  | { type: 'created'; project: any }
  | { type: 'updated'; project: any }
  | { type: 'deleted'; id: number };

@Injectable()
export class ProjectsEvents {
  private readonly emitter = new EventEmitter();

  emit(event: 'project_changed', payload: ProjectsEventPayload) {
    this.emitter.emit(event, payload);
  }

  on(
    event: 'project_changed',
    listener: (payload: ProjectsEventPayload) => void,
  ) {
    this.emitter.on(event, listener);
  }

  off(
    event: 'project_changed',
    listener: (payload: ProjectsEventPayload) => void,
  ) {
    this.emitter.off(event, listener);
  }
}
