'use server';

/**
 * @fileOverview Summarizes financial data (income and expenses) over a specified time period using GenAI.
 *
 * - summarizeFinancialData - A function that takes income and expense data, and a time period, and returns a summary.
 * - FinancialSummaryInput - The input type for the summarizeFinancialData function.
 * - FinancialSummaryOutput - The return type for the summarizeFinancialData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialSummaryInputSchema = z.object({
  income: z.array(z.object({
    amount: z.number(),
    time: z.string(), // ISO date string
    source: z.string(),
  })),
  expenses: z.array(z.object({
    amount: z.number(),
    time: z.string(), // ISO date string
    type: z.string(),
  })),
  timePeriod: z.enum(['day', 'week', 'month', 'year']).describe('The time period to summarize over.'),
});
export type FinancialSummaryInput = z.infer<typeof FinancialSummaryInputSchema>;

const FinancialSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the income and expenses over the specified time period.'),
});
export type FinancialSummaryOutput = z.infer<typeof FinancialSummaryOutputSchema>;

export async function summarizeFinancialData(input: FinancialSummaryInput): Promise<FinancialSummaryOutput> {
  return financialSummaryFlow(input);
}

const financialSummaryPrompt = ai.definePrompt({
  name: 'financialSummaryPrompt',
  input: {schema: FinancialSummaryInputSchema},
  output: {schema: FinancialSummaryOutputSchema},
  prompt: `You are a financial expert.  Summarize the following financial data for the given time period.

Time Period: {{{timePeriod}}}

Income:
{{#each income}}
  - Amount: {{amount}}, Time: {{time}}, Source: {{source}}
{{/each}}

Expenses:
{{#each expenses}}
  - Amount: {{amount}}, Time: {{time}}, Type: {{type}}
{{/each}}

Summary:`,
});

const financialSummaryFlow = ai.defineFlow(
  {
    name: 'financialSummaryFlow',
    inputSchema: FinancialSummaryInputSchema,
    outputSchema: FinancialSummaryOutputSchema,
  },
  async input => {
    const {output} = await financialSummaryPrompt(input);
    return output!;
  }
);
