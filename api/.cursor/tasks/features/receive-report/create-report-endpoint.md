## Descrição

Crie um endpoint com a seguinte assinatura:

Request:
URL: POST - /report
```
{
    title: string,
    description: string,
    address: {
        city: string,
        state: string,
        zipCode: string,
        neighborhood: string,
        street: string,
        addressNumber: string
    }
}
```

response:
HTTP Status code: 201
Body:
```json
{
    success: true
}
```

## Fluxo da chamada:

1. Receba a chamada em uma Controller
2. Valide os dados do input com class-validator
3. Envie os dados para um prompt para o Google Gemini ([conteúdo do prompt aqui](./analize-report-ai-instructuions.md))
4. O prompt retornará um JSON, que deve ser salvo na entidade Report do MongoDB com os seguintes campos:
```json
{
    category: string,
    severity: enum (critical, high, medium, low, lowest),
    description: string
}
```
5. Retorne o JSON de resposta