import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stat } from './stat.entity';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { StatsEvents } from './stats.events';

@Module({
  imports: [TypeOrmModule.forFeature([Stat])],
  controllers: [StatsController],
  providers: [StatsService, StatsEvents],
  exports: [StatsService, StatsEvents],
})
export class StatsModule {}
