import React from 'react'

export const InfoAside: React.FC = () => (
  <aside className="relative md:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 p-8 text-emerald-50">
    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/30 blur-3xl" />
    <div className="absolute -left-16 bottom-10 h-52 w-52 rounded-full bg-emerald-900/40 blur-3xl" />

    <div className="relative space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">
        Sua voz transforma a cidade
      </h2>
      <p className="text-xs text-emerald-100/80">
        Relatos como o seu ajudam a priorizar intervenções em pontos
        críticos, garantindo mais segurança, conforto e qualidade de
        vida para toda a população.
      </p>
    </div>

    <div className="relative mt-8 space-y-3 rounded-2xl bg-emerald-950/30 p-4 text-xs">
      <p className="font-medium text-emerald-50/90">
        Exemplos de problemas que podem ser relatados:
      </p>
      <ul className="space-y-1.5 text-emerald-100/80">
        <li>• Iluminação pública apagada ou intermitente</li>
        <li>• Buracos em vias ou calçadas</li>
        <li>• Ponto de ônibus danificado ou sem cobertura</li>
        <li>• Vazamentos de água ou esgoto a céu aberto</li>
      </ul>
    </div>
  </aside>
)
