import { useMutation } from '@tanstack/react-query'
import type { CreateReportInput } from '../../core/models/report'
import { reportService } from '../api/reportService'

interface UseSendReportParams {
  onSuccess?: () => void
}

export const useSendReport = ({ onSuccess }: UseSendReportParams = {}) => {
  return useMutation({
    mutationFn: (data: CreateReportInput) => reportService.createReport(data),
    onSuccess: () => {
      onSuccess?.()
    },
  })
}

