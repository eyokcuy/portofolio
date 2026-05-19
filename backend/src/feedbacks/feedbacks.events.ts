import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { Feedback } from './feedback.entity';

export type FeedbackEventPayload = {
  type: 'created' | 'updated' | 'deleted';
  feedback?: Feedback;
  id?: number;
};

@Injectable()
export class FeedbacksEvents extends EventEmitter {
  emit(event: 'feedback_changed', payload: FeedbackEventPayload): boolean {
    return super.emit(event, payload);
  }

  on(
    event: 'feedback_changed',
    listener: (payload: FeedbackEventPayload) => void,
  ): this {
    return super.on(event, listener);
  }

  off(
    event: 'feedback_changed',
    listener: (payload: FeedbackEventPayload) => void,
  ): this {
    return super.off(event, listener);
  }
}
