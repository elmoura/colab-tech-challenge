import React from 'react'
import { Button } from '@/shared/components/atoms'

interface FormFooterProps {
  isSubmitDisabled: boolean
}

export const FormFooter: React.FC<FormFooterProps> = ({
  isSubmitDisabled,
}) => (
  <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-1">
    <p className="text-[11px] text-emerald-900/70 text-center">
      Os campos de endereço (exceto CEP), título e descrição são
      obrigatórios para que a solicitação seja enviada à prefeitura.
    </p>

    <Button type="submit" disabled={isSubmitDisabled}>
      <span>Enviar solicitação</span>
      <span className="h-1 w-4 rounded-full bg-emerald-200/80" />
    </Button>
  </div>
)
