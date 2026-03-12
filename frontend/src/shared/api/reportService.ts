import type { CreateReportInput } from '../../core/models/report'
import { httpClient } from './httpClient'

export const reportService = {
  createReport: (data: CreateReportInput) =>
    httpClient<void>('http://localhost:3000/report', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}

