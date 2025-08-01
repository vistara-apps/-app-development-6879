import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export const generateStrategyRecommendations = async (companyData, benchmarkData) => {
  try {
    const prompt = `
You are a McKinsey-level business strategy consultant. Analyze the following company data and provide detailed strategic recommendations.

Company Information:
- Name: ${companyData.name}
- Industry: ${companyData.industry}
- Revenue: $${companyData.revenue}
- Expenses: $${companyData.expenses}
- Assets: $${companyData.assets}
- Liabilities: $${companyData.liabilities}

Financial Metrics:
- Profit Margin: ${(((companyData.revenue - companyData.expenses) / companyData.revenue) * 100).toFixed(2)}%
- Debt-to-Asset Ratio: ${((companyData.liabilities / companyData.assets) * 100).toFixed(2)}%
- ROA: ${(((companyData.revenue - companyData.expenses) / companyData.assets) * 100).toFixed(2)}%

Benchmark Comparisons:
${benchmarkData.map(b => `- ${b.metric}: Company ${b.company_value} vs Industry Average ${b.industry_average}`).join('\n')}

Please provide 5-7 specific, actionable strategic recommendations. For each recommendation, include:
1. Title (clear and concise)
2. Description (detailed explanation)
3. Priority (high/medium/low)
4. Timeline (e.g., "3-6 months", "6-12 months")

Format your response as JSON with this structure:
{
  "recommendations": [
    {
      "title": "Recommendation Title",
      "description": "Detailed description...",
      "priority": "high/medium/low",
      "timeline": "timeframe"
    }
  ]
}
`;

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;
    const parsedResponse = JSON.parse(response);
    return parsedResponse.recommendations;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw new Error('Failed to generate strategy recommendations');
  }
};

export const generateExecutiveSummary = async (companyData, recommendations) => {
  try {
    const prompt = `
Create an executive summary for a strategic consulting report for ${companyData.name}, a ${companyData.industry} company.

Company Overview:
- Revenue: $${companyData.revenue}
- Expenses: $${companyData.expenses}
- Net Profit: $${companyData.revenue - companyData.expenses}
- Total Assets: $${companyData.assets}
- Total Liabilities: $${companyData.liabilities}

Key Recommendations:
${recommendations.map((rec, index) => `${index + 1}. ${rec.title}`).join('\n')}

Write a comprehensive 3-4 paragraph executive summary that:
1. Summarizes the company's current financial position
2. Highlights the key strategic challenges and opportunities
3. Outlines the main strategic recommendations
4. Emphasizes the potential impact and value

Keep it professional and data-driven, suitable for C-level executives.
`;

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating executive summary:', error);
    throw new Error('Failed to generate executive summary');
  }
};