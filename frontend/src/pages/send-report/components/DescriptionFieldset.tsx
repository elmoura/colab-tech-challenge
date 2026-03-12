import React from 'react'
import { type Control } from 'react-hook-form'
import { InputField, TextAreaField } from '@/shared/components/molecules'
import type { SendReportFormData } from '../hooks/useSendReportForm'

interface DescriptionFieldsetProps {
  control: Control<SendReportFormData>
  isPending: boolean
}

export const DescriptionFieldset: React.FC<DescriptionFieldsetProps> = ({
  control,
  isPending,
}) => (
  <fieldset
    className="space-y-4 rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/80 to-white p-4 md:p-5"
    disabled={isPending}
  >
    <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
      Descrição do problema
    </legend>

    <div className="space-y-1.5">
      <label
        htmlFor="title"
        className="text-xs font-medium text-emerald-900/90"
      >
        Título
      </label>
      <InputField
        id="title"
        name="title"
        control={control}
        placeholder="Ex: Ponto de ônibus sem cobertura expõe idosos ao sol e chuva"
        type="text"
      />
    </div>

    <div className="space-y-1.5">
      <label
        htmlFor="description"
        className="text-xs font-medium text-emerald-900/90"
      >
        Descrição detalhada
      </label>
      <TextAreaField
        id="description"
        name="description"
        control={control}
        rows={5}
        placeholder="Explique o problema, quem é afetado e há quanto tempo ocorre."
      />
    </div>
  </fieldset>
)
