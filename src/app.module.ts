import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HealthModule } from './health/health.module';
import { InfoModule } from './info/info.module';
// import { PrismaModule } from './prisma/prisma.module';

@Module({
  // it seems that the order of the imports is important to determine the order of onModuleInit
  imports: [
    HealthModule,
    InfoModule,
    // PrismaModule
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}
