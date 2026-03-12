export const SendReportSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 rounded-3xl bg-emerald-400/40 blur-3xl opacity-70" />

        <div className="relative flex flex-col items-center gap-6 rounded-3xl bg-emerald-950/70 px-8 py-10 text-center text-emerald-50 shadow-2xl shadow-emerald-950/60 ring-1 ring-emerald-500/40">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-900/50">
            <span className="text-4xl font-black text-emerald-50">✓</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Solicitação enviada com sucesso
            </h1>
            <p className="text-sm text-emerald-100/80">
              Seu relato foi registrado e encaminhado à equipe responsável da
              prefeitura. Agradecemos por contribuir com uma cidade mais segura
              e acolhedora.
            </p>
          </div>

          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 px-6 py-2.5 text-xs font-semibold text-emerald-950 shadow-lg shadow-emerald-900/40 transition hover:from-emerald-300 hover:to-emerald-400 hover:shadow-emerald-900/60"
          >
            Enviar novo relato
          </a>
        </div>
      </div>
    </div>
  )
}
