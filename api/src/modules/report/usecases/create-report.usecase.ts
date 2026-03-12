import fs from 'fs';
import path from 'path';
import { Injectable } from '@nestjs/common';
import { AnalyzedReport, GeminiService } from '@shared/services/gemini.service';
import { ReportDataSource } from '../datasources/report.datasource';
import { CreateReportInputDto } from './dtos/create-report.input.dto';
import removeMd from 'remove-markdown';
import { CreateReportOutputDto } from './dtos/create-report.output.dto';

const ANALIZE_REPORT_PROMPT_PATH = path.join(
  process.cwd(),
  'prompts',
  'analize-report-ai-instructions.md',
);

@Injectable()
export class CreateReportUsecase {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly reportDataSource: ReportDataSource,
  ) {}

  async execute(input: CreateReportInputDto): Promise<CreateReportOutputDto> {
    const prompt = this.buildPrompt(input);

    const aiResponse = await this.geminiService.sendPrompt(prompt);
    const analysis = this.parseAiResponse(aiResponse);

    await this.reportDataSource.create({
      category: analysis.category,
      severity: analysis.severity,
      title: analysis.title,
      description: analysis.description,
      address: input.address,
      originalReport: {
        title: input.title,
        description: input.description,
      },
    });

    return {success: true};
  }

  private buildPrompt(input: CreateReportInputDto): string {
    const prompt = fs.readFileSync(ANALIZE_REPORT_PROMPT_PATH, 'utf8');

    const freeText = [
      prompt,
      '```json',
      JSON.stringify(input, null, 2),
      '```',
    ].join('\n');

    return freeText;
  }

  private parseAiResponse(aiResponse: string): AnalyzedReport {
    try {
      const treatedResponse = removeMd(aiResponse); // AI retornava resposta com Markdown, mesmo sendo instruída repetidamente a não fazer isso :/
      return JSON.parse(treatedResponse) as AnalyzedReport;
    } catch (error) {
      console.error('Error parsing Gemini response as JSON', error);
      throw new Error('Failed to parse Gemini response as JSON');
    }
  }
}
