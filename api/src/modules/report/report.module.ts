import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './entities/report.entity';
import { ReportDataSource } from './datasources/report.datasource';
import { CreateReportUsecase } from './usecases/create-report.usecase';
import { ReportController } from './report.controller';
import { GeminiService } from '../../shared/services/gemini.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }]),
  ],
  controllers: [ReportController],
  providers: [ReportDataSource, CreateReportUsecase, GeminiService],
})
export class ReportModule {}
