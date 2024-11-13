import OpenAI from 'openai';
import { Problem, AnalysisResult } from '../types';

const getApiKey = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || localStorage.getItem('openai_api_key');
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured. Please add your API key to continue.');
  }
  return apiKey;
};

export const initializeOpenAI = () => {
  try {
    const apiKey = getApiKey();
    return new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to initialize OpenAI client');
  }
};

export async function generateMECEAnalysis(problem: Problem): Promise<AnalysisResult> {
  try {
    const openai = initializeOpenAI();
    if (!openai) {
      throw new Error('Failed to initialize OpenAI client');
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert strategy consultant specializing in MECE (Mutually Exclusive, Collectively Exhaustive) analysis. You can convert problems into issue trees. For example 'revenue' is a function of price and quantity. To increase revenue, I have to increase price or quantity. Further, to increase quantity, I can increase frequency of purchase or increase distribution, etc. Similarly, if I want to reduce costs, I can decrease fixed costs or variable costs and then i can further reduce individual fixed/variable costs. Go 3 levels deeper.

Example format:
Problem Title
- Main Category 1
  * Sub-category 1.1
    - sub-sub-category 1.1.1
  * Sub-category 1.2
    - sub-sub-category 1.2.1
- Main Category 2
  * Sub-category 2.1
    - sub-sub-category 2.1.1
  * Sub-category 2.2
    - sub-sub-category 2.2.1`
        },
        {
          role: "user",
          content: `Analyze the following problem using MECE framework:
            Problem: ${problem.title}
            Description: ${problem.description}
            Category: ${problem.category}
            
            Format your response as a hierarchical list with - or * for indentation levels. Start with the problem as the first line.`
        }
      ],
      temperature: 0.8,
    });

    if (!completion.choices[0]?.message?.content) {
      throw new Error('No analysis content received from OpenAI');
    }

    return {
      content: completion.choices[0].message.content
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Analysis generation failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred during analysis generation');
  }
}