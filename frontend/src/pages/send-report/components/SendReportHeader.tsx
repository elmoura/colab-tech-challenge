import React from 'react'

export const SendReportHeader: React.FC = () => (
  <header className="space-y-2">
    <p className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
      Relato de problema urbano
    </p>
    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-emerald-900">
      Ajude a cuidar da sua cidade
    </h1>
    <p className="text-sm text-emerald-900/70">
      Descreva o problema que você encontrou. Sua participação é
      essencial para melhorar a infraestrutura urbana e o bem-estar
      da população.
    </p>
  </header>
)
