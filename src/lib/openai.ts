import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OpenAI API key is not set. Please add VITE_OPENAI_API_KEY to your .env file');
}

export const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true // Note: In production, API calls should be made through a backend
});

export const generateMECEAnalysis = async (problem: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert business consultant specializing in MECE (Mutually Exclusive, Collectively Exhaustive) analysis. For example, if a business wants to increase profits, it has to either increase sales, reduce costs or do both. Another example is if a business wants to reduce costs, it can either reduce headcount/salary related costs or it can reduce rental costs by working remote, or reduce other expenses/overheads"
        },
        {
          role: "user",
          content: `Analyze the following problem using MECE framework: ${problem}. Provide a choice of solutions that are mutually exclusive and collectively exhaustive.`
        }
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating MECE analysis:', error);
    throw error;
  }
};