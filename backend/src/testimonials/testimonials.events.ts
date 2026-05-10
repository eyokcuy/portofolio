import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';

export type TestimonialsEventPayload =
  | { type: 'created'; testimonial: any }
  | { type: 'updated'; testimonial: any }
  | { type: 'deleted'; id: number };

@Injectable()
export class TestimonialsEvents {
  private readonly emitter = new EventEmitter();

  emit(event: 'testimonial_changed', payload: TestimonialsEventPayload) {
    this.emitter.emit(event, payload);
  }

  on(
    event: 'testimonial_changed',
    listener: (payload: TestimonialsEventPayload) => void,
  ) {
    this.emitter.on(event, listener);
  }

  off(
    event: 'testimonial_changed',
    listener: (payload: TestimonialsEventPayload) => void,
  ) {
    this.emitter.off(event, listener);
  }
}
