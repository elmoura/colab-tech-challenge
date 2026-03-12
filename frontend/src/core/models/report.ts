export interface ReportAddress {
  street: string
  addressNumber: string
  neighborhood: string
  zipCode?: string
}

export interface CreateReportInput {
  title: string
  description: string
  address: ReportAddress
}

