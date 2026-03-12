# Iniciando o projeto

```bash
# Lembre-se de rodar o back-end previamente

$ npm i
$ npm run dev # Tudo feito 👍
```

# Arquitetura

Aqui também seguimos conceitos da Clean Architecture para separar as diferentes camadas da aplicação (tipos, chamadas HTTP, componentes visuais, hooks, form handling, etc.). 

- A camada `core` contém a lógica crua dos fluxos de negócio e atualmente mantém entidades/models, mas pode ser extendida para guardar use-cases também. 
- `shared` mantém uma separação em subpastas para diferentes tipos de arquivos que podem ser reutilizados ao redor do projeto. 
- `pages` contém a lógica das páginas de maneira mais específica para cada caso, que pode conter componentes ou hooks separados, mas que não seriam reaproveitáveis para o restante do projeto.  

Abaixo segue a árvore de arquivos com suas separações:

```
src/
├── assets/               # Imagens, ícones, fontes
├── core/                  # Lógica de negócio pura
│   └── models/            # Interfaces/Types do domínio
│       └── report.ts      # Ex: IReport, ReportStatus, ReportCategory
│
├── shared/                 # Código reutilizável entre features
│   ├── api/                # Camada de comunicação HTTP
│   │   ├── httpClient.ts   # Instância do fetch com interceptors
│   │   └── reportService.ts # Métodos: createReport, fetchReports, etc.
│   │
│   ├── components/         # Atomic Design
│   │   ├── atoms/          # Botões, inputs, ícones (componentes simpes, com 1 única função)
│   │   │   ├── Button/
│   │   │   └── Input/
│   │   ├── molecules/      # Combinações de átomos
│   │   │   ├── ReportCard/
│   │   │   └── SearchBar/
│   │   └── organisms/       # Seções complexas da UI
│   │       ├── Header/
│   │       └── ReportForm/
│   │
│   └── hooks/               # Hooks compartilhados
│       └── useDebounce.ts
│
└── pages/                    # Páginas da aplicação
    ├── send-report/
    │   ├── components/        # Componentes específicos da página
    │   │   └── LocationStep.tsx    # Uma seção da página
    │   │   
    │   ├── hooks/             # Hooks específicos
    │   │   ├── useSendReportForm.ts  # React Hook Form + Zod
    │   │   └── useReportValidation.ts # Encapsula request HTTP com react-query
    │   ├── SendReportPage.tsx
    │   └── SendReportPage.spec.tsx
    │
    └── dashboard/             # (futuro) Listagem de relatos
├── router.tsx            # Configuração central de rotas React Router (AppRoutes)
```


---



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
