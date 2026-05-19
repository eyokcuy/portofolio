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
import { StatsService } from './stats.service';
import { StatsEvents, StatsEventPayload } from './stats.events';

@Controller('stats')
export class StatsController {
  constructor(
    private readonly service: StatsService,
    private readonly events: StatsEvents,
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

    const listener = (payload: StatsEventPayload) => {
      res.write('event: stats_changed\n');
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
    };

    this.events.on('stats_changed', listener);

    res.on('close', () => {
      clearInterval(keepAlive);
      this.events.off('stats_changed', listener);
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
