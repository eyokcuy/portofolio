import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { ProjectsEvents } from './projects.events';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private repo: Repository<Project>,
    private readonly events: ProjectsEvents,
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(data: Partial<Project>) {
    const project = this.repo.save(this.repo.create(data));
    // emit after persistence (best-effort; save is sync-ish in TypeORM but returns Promise/Entity)
    Promise.resolve(project)
      .then((p) =>
        this.events.emit('project_changed', { type: 'created', project: p }),
      )
      .catch(() => undefined);

    return project;
  }

  async patch(id: number, data: Partial<Project>) {
    const project = await this.repo.findOne({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');

    this.repo.merge(project, data);
    const saved = await this.repo.save(project);

    this.events.emit('project_changed', { type: 'updated', project: saved });
    return saved;
  }

  async remove(id: number) {
    const project = await this.repo.findOne({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');

    await this.repo.remove(project);

    this.events.emit('project_changed', { type: 'deleted', id });
    return { deleted: true, id };
  }
}
