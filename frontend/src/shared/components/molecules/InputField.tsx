import React from 'react'
import { Controller, type Control, type RegisterOptions } from 'react-hook-form'
import { Input, type InputProps } from '../atoms/Input'

interface InputFieldProps extends Omit<InputProps, 'name' | 'ref'> {
  name: string
  control: Control<any>
  rules?: RegisterOptions
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  control,
  rules,
  ...inputProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <>
          <Input {...field} {...inputProps} />
          {fieldState.error && (
            <p className="text-xs text-emerald-700">
              {fieldState.error.message}
            </p>
          )}
        </>
      )}
    />
  )
}
