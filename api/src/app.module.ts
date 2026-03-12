import { Module } from '@nestjs/common';
import { ReportModule } from './modules/report/report.module';
import { DatabaseModule } from '@config/database.module';

@Module({
  imports: [DatabaseModule, ReportModule],
})
export class AppModule {}
