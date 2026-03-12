import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { CreateReportInput } from '../../../core/models/report'

const reportSchema = z.object({
  title: z
    .string()
    .min(5, 'Título deve ter pelo menos 5 caracteres')
    .max(120, 'Título deve ter no máximo 120 caracteres'),
  description: z
    .string()
    .min(20, 'Descrição deve ter pelo menos 20 caracteres')
    .max(2000, 'Descrição deve ter no máximo 2000 caracteres'),
  address: z.object({
    street: z.string().min(1, 'Rua é obrigatória'),
    addressNumber: z.string().min(1, 'Número é obrigatório'),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    zipCode: z
      .string()
      .min(8, 'CEP deve ter pelo menos 8 caracteres')
      .max(9, 'CEP deve ter no máximo 9 caracteres')
      .optional()
      .or(z.literal('')),
  }),
})

export type SendReportFormData = z.infer<typeof reportSchema>

export const useSendReportForm = () => {
  return useForm<SendReportFormData>({
    resolver: zodResolver(reportSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      address: {
        street: '',
        addressNumber: '',
        neighborhood: '',
        zipCode: '',
      },
    },
  })
}

export const mapFormToCreateReportInput = (
  data: SendReportFormData,
): CreateReportInput => {
  const zipCode =
    data.address.zipCode && data.address.zipCode.trim().length > 0
      ? data.address.zipCode
      : undefined

  return {
    title: data.title,
    description: data.description,
    address: {
      street: data.address.street,
      addressNumber: data.address.addressNumber,
      neighborhood: data.address.neighborhood,
      zipCode,
    },
  }
}

