interface HttpClientOptions extends RequestInit {
  skipJsonParse?: boolean
}

export const httpClient = async <TResponse>(
  input: RequestInfo | URL,
  { skipJsonParse, headers, ...init }: HttpClientOptions = {},
): Promise<TResponse> => {
  const mergedHeaders = {
    'Content-Type': 'application/json',
    ...(headers ?? {}),
  }

  const response = await fetch(input, {
    ...init,
    headers: mergedHeaders,
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    throw new Error(errorText || 'Falha ao comunicar com o servidor')
  }

  if (skipJsonParse) {
    // @ts-expect-error allow void/empty responses
    return undefined
  }

  return (await response.json()) as TResponse
}
