import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { TestimonialsService } from './testimonials.service';
import {
  TestimonialsEvents,
  TestimonialsEventPayload,
} from './testimonials.events';

@Controller('testimonials')
export class TestimonialsController {
  constructor(
    private service: TestimonialsService,
    private readonly events: TestimonialsEvents,
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

    const listener = (payload: TestimonialsEventPayload) => {
      res.write('event: testimonial_changed\n');
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
    };

    this.events.on('testimonial_changed', listener);

    res.on('close', () => {
      clearInterval(keepAlive);
      this.events.off('testimonial_changed', listener);
    });

    res.write('event: ready\n');
    res.write(`data: ${JSON.stringify({ ok: true })}\n\n`);
  }

  @Post()
  create(@Body() body) {
    return this.service.create(body);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() body) {
    return this.service.patch(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
