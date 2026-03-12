import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateReportUsecase } from './usecases/create-report.usecase';
import { CreateReportInputDto } from './usecases/dtos/create-report.input.dto';
import { CreateReportOutputDto } from './usecases/dtos/create-report.output.dto';

@Controller()
export class ReportController {
  constructor(private readonly createReportUsecase: CreateReportUsecase) {}

  @Post('/report')
  @HttpCode(HttpStatus.CREATED)
  async createReport(
    @Body() body: CreateReportInputDto,
  ): Promise<CreateReportOutputDto> {
    return await this.createReportUsecase.execute(body);
  }
}
