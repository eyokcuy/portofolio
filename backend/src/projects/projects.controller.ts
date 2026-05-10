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
import { ProjectsService } from './projects.service';
import { ProjectsEvents, ProjectsEventPayload } from './projects.events';

@Controller('projects')
export class ProjectsController {
  constructor(
    private service: ProjectsService,
    private readonly events: ProjectsEvents,
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const keepAlive = setInterval(() => {
      res.write('event: ping\n');
      res.write(`data: ${JSON.stringify({ ts: Date.now() })}\n\n`);
    }, 25000);

    const listener = (payload: ProjectsEventPayload) => {
      res.write('event: project_changed\n');
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
    };

    this.events.on('project_changed', listener);

    res.on('close', () => {
      clearInterval(keepAlive);
      this.events.off('project_changed', listener);
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
