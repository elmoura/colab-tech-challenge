import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSendReportForm, mapFormToCreateReportInput } from './hooks/useSendReportForm'
import { useSendReport } from '../../shared/hooks/useSendReport'
// those low-level components are used by sections, not directly here
import {
  SendReportHeader,
  AddressFieldset,
  DescriptionFieldset,
  FormFooter,
  InfoAside,
} from './components'

export const SendReportPage = () => {
  const navigate = useNavigate()
  const form = useSendReportForm()
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form

  const {
    mutateAsync: sendReport,
    isPending,
  } = useSendReport({
    onSuccess: () => navigate('/enviado'),
  })

  const isSubmitDisabled = useMemo(
    () => !isValid || isPending,
    [isValid, isPending],
  )

  const onSubmit = async () => {
    const values = form.getValues()
    const payload = mapFormToCreateReportInput(values)

    await sendReport(payload)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-3xl">
        <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald-400/40 via-emerald-500/20 to-emerald-300/40 blur-2xl opacity-70" />

        <div className="relative rounded-3xl bg-white shadow-2xl shadow-emerald-900/10 ring-1 ring-emerald-100/80 overflow-hidden">
          <div className="grid gap-2 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <section className="px-4 py-8 md:px-6 md:pl-8 md:py-10 space-y-6">
              <SendReportHeader />

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
                aria-busy={isPending}
              >
                <AddressFieldset control={control} isPending={isPending} />

                <DescriptionFieldset control={control} isPending={isPending} />

                <FormFooter isSubmitDisabled={isSubmitDisabled} />
              </form>
            </section>

            <InfoAside />
          </div>

          {isPending && (
            <div className="absolute inset-0 flex items-center justify-center bg-emerald-950/10 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3 rounded-2xl bg-white/90 px-6 py-4 shadow-lg shadow-emerald-900/20 ring-1 ring-emerald-100">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
                  <span className="text-xs font-medium text-emerald-900">
                    Enviando sua solicitação...
                  </span>
                </div>
                <p className="text-[11px] text-emerald-900/70">
                  Isso costuma levar apenas alguns segundos.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

