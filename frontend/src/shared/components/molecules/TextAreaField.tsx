import React from 'react'
import { Controller, type Control, type RegisterOptions } from 'react-hook-form'
import { TextArea, type TextAreaProps } from '../atoms/TextArea'

interface TextAreaFieldProps extends Omit<TextAreaProps, 'name' | 'ref'> {
  name: string
  control: Control<any>
  rules?: RegisterOptions
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  control,
  rules,
  ...textAreaProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <>
          <TextArea {...field} {...textAreaProps} />
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
