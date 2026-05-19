import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksEvents, FeedbackEventPayload } from './feedbacks.events';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(
    private readonly service: FeedbacksService,
    private readonly events: FeedbacksEvents,
  ) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('events')
  sseEvents(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const keepAlive = setInterval(() => {
      res.write('event: ping\n');
      res.write(`data: ${JSON.stringify({ ts: Date.now() })}\n\n`);
    }, 25000);

    const listener = (payload: FeedbackEventPayload) => {
      res.write('event: feedback_changed\n');
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
    };

    this.events.on('feedback_changed', listener);

    res.on('close', () => {
      clearInterval(keepAlive);
      this.events.off('feedback_changed', listener);
    });

    res.write('event: ready\n');
    res.write(`data: ${JSON.stringify({ ok: true })}\n\n`);
  }

  @Post()
  create(@Body() body) {
    return this.service.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.service.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
