import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from '../entities/report.entity';

@Injectable()
export class ReportDataSource {
  constructor(
    @InjectModel(Report.name)
    private readonly reportModel: Model<Report>,
  ) {}

  async create(data: Partial<Report>): Promise<Report> {
    const created = new this.reportModel(data);
    return created.save();
  }
}
