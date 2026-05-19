import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProjectsModule } from './projects/projects.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StatsModule } from './stats/stats.module';

import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'portofolio',
      autoLoadEntities: true,
      synchronize: true, // dev only
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 200, // 200 requests per minute for admin panel + SSE
      },
    ]),

    ProjectsModule,
    FeedbacksModule,
    UploadModule,
    AuthModule,
    UsersModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
