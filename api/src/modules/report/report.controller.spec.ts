import { ReportController } from './report.controller';
import { CreateReportUsecase } from './usecases/create-report.usecase';
import { CreateReportInputDto } from './usecases/dtos/create-report.input.dto';

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

describe('ReportController', () => {
  let usecase: { execute: jest.Mock };
  let controller: ReportController;

  beforeEach(() => {
    usecase = { 
      execute: jest.fn().mockResolvedValue({ success: true }) 
    };

    controller = new ReportController(
      // @ts-expect-error partial mock
      usecase,
    );
  });

  it('forwards body to usecase and returns success flag', async () => {
    const input = makeInput();

    const result = await controller.createReport(input);

    expect(usecase.execute).toHaveBeenCalledWith(input);
    expect(result).toEqual({ success: true });
  });
});
