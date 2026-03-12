import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SeverityLevel } from '@modules/report/entities/report.entity';
import { getConfig } from '@config/vars';

export interface AnalyzedReport {
  category: string;
  severity: SeverityLevel;
  title: string;
  description: string;
}

@Injectable()
export class GeminiService {
  private readonly client: GoogleGenerativeAI;

  // Inserir API Key
  constructor() {
    const config = getConfig();
    this.client = new GoogleGenerativeAI(config.geminiApiKey);
  }

  async sendPrompt(prompt: string): Promise<string> {
    const config = getConfig();

    const model = this.client.getGenerativeModel({
      model: config.geminiModel,
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  }
}
