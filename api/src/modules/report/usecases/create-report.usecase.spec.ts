import fs from 'fs';

import { CreateReportUsecase } from './create-report.usecase';
import { CreateReportInputDto } from './dtos/create-report.input.dto';
import { AnalyzedReport } from '../../../shared/services/gemini.service';
import { SeverityLevel } from '../entities/report.entity';

// Helpers to build a minimal valid input object
function makeInput(): CreateReportInputDto {
  return {
    title: 'Minha reclamação',
    description: 'A água está suja',
    address: {
      zipCode: '01234-567',
      neighborhood: 'Centro',
      street: 'Rua Teste',
      addressNumber: '100',
    },
  };
}

describe('CreateReportUsecase', () => {
  let geminiService: { sendPrompt: jest.Mock };
  let reportDataSource: { create: jest.Mock };
  let usecase: CreateReportUsecase;


  beforeEach(() => {
    geminiService = { sendPrompt: jest.fn() };
    reportDataSource = { create: jest.fn() };
    usecase = new CreateReportUsecase(
      // @ts-expect-error: partial mock
      geminiService,
      reportDataSource,
    );

    jest.spyOn(fs, 'readFileSync').mockReturnValue('PROMPT CONTENT'); // default behaviour for fs read
    jest.spyOn(console, 'error').mockImplementation(() => {}); // silence expected errors in test output
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('builds a prompt containing the provided report information', () => {
    const input = makeInput();
    const result = (usecase as any).buildPrompt(input);

    expect(fs.readFileSync).toHaveBeenCalled();
    expect(result).toContain('PROMPT CONTENT');
    expect(result).toContain(JSON.stringify(input, null, 2));
  });

  it('calls GeminiService and ReportDataSource on successful integration', async () => {
    const input = makeInput();
    const fakeAnalysis: AnalyzedReport = {
      category: 'categoria',
      severity: SeverityLevel.LOW,
      title: 'título AI',
      description: 'descrição AI',
    };

    // the AI sometimes returns markdown, the usecase strips it
    const aiRaw = `**${JSON.stringify(fakeAnalysis)}**`;
    geminiService.sendPrompt.mockResolvedValue(aiRaw);

    await usecase.execute(input);

    expect(geminiService.sendPrompt).toHaveBeenCalled();
    expect(reportDataSource.create).toHaveBeenCalledWith({
      category: fakeAnalysis.category,
      severity: fakeAnalysis.severity,
      title: fakeAnalysis.title,
      description: fakeAnalysis.description,
      address: input.address,
      originalReport: {
        title: input.title,
        description: input.description,
      },
    });
  });

  it('throws when Gemini response cannot be parsed as JSON', async () => {
    geminiService.sendPrompt.mockResolvedValue('not a json');

    await expect(usecase.execute(makeInput())).rejects.toThrow(
      /Failed to parse Gemini response/i,
    );
  });

  describe('parseAiResponse', () => {
    it('strips markdown and parses valid JSON', () => {
      const payload: AnalyzedReport = {
        category: 'c',
        severity: SeverityLevel.HIGH,
        title: 't',
        description: 'd',
      };
      const withMd = `**${JSON.stringify(payload)}**`;
      const parsed = (usecase as any).parseAiResponse(withMd);
      expect(parsed).toEqual(payload);
    });

    it('rethrows on invalid json', () => {
      expect(() =>
        (usecase as any).parseAiResponse('not json'),
      ).toThrow(/Failed to parse Gemini response/);
    });
  });
});
