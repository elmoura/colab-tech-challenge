import 'dotenv/config';

export interface AppConfig {
  port: number;
  mongoUri: string;
  geminiApiKey: string;
  geminiModel: string;
}

export const getConfig = (): AppConfig => {
  const { PORT, MONGO_URI, GEMINI_API_KEY, GEMINI_MODEL } = process.env;

  if (!MONGO_URI) {
    throw new Error('MONGO_URI env var is required');
  }

  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY env var is required');
  }

  return {
    port: PORT ? Number(PORT) : 3000,
    mongoUri: MONGO_URI ?? '',
    geminiApiKey: GEMINI_API_KEY ?? '',
    geminiModel: GEMINI_MODEL ?? 'gemini-flash-latest',
  };
};
