import React from 'react'
import { type Control } from 'react-hook-form'
import { InputField } from '@/shared/components/molecules'
import type { SendReportFormData } from '../hooks/useSendReportForm'

interface AddressFieldsetProps {
  control: Control<SendReportFormData>
  isPending: boolean
}

export const AddressFieldset: React.FC<AddressFieldsetProps> = ({
  control,
  isPending,
}) => (
  <fieldset
    className="space-y-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 md:p-5"
    disabled={isPending}
  >
    <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
      Endereço do problema
    </legend>

    <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)]">
      <div className="space-y-1.5">
        <label
          htmlFor="street"
          className="text-xs font-medium text-emerald-900/90"
        >
          Rua
        </label>
        <InputField
          id="street"
          name="address.street"
          control={control}
          placeholder="Ex: Avenida Pará"
          autoComplete="street-address"
          type="text"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="addressNumber"
          className="text-xs font-medium text-emerald-900/90"
        >
          Número
        </label>
        <InputField
          id="addressNumber"
          name="address.addressNumber"
          control={control}
          placeholder="Ex: 1720"
          autoComplete="on"
          type="number"
        />
      </div>
    </div>

    <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="space-y-1.5">
        <label
          htmlFor="neighborhood"
          className="text-xs font-medium text-emerald-900/90"
        >
          Bairro
        </label>
        <InputField
          id="neighborhood"
          name="address.neighborhood"
          control={control}
          placeholder="Ex: Centro"
          autoComplete="address-level2"
          type="text"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="zipCode"
          className="flex items-center justify-between text-xs font-medium text-emerald-900/90"
        >
          <span>CEP</span>
          <span className="text-[10px] font-normal text-emerald-900/60">
            opcional
          </span>
        </label>
        <InputField
          id="zipCode"
          name="address.zipCode"
          control={control}
          placeholder="Ex: 38400-902"
          inputMode="numeric"
          autoComplete="postal-code"
          type="number"
        />
      </div>
    </div>
  </fieldset>
)
