import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksEvents } from './feedbacks.events';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback])],
  controllers: [FeedbacksController],
  providers: [FeedbacksService, FeedbacksEvents],
  exports: [FeedbacksService, FeedbacksEvents],
})
export class FeedbacksModule {}
