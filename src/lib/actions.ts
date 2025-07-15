"use server";

import { generateProjectSummary, GenerateProjectSummaryInput } from "@/ai/flows/generate-project-summary";

export async function generateSummaryAction(input: GenerateProjectSummaryInput) {
  try {
    const result = await generateProjectSummary(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating summary:", error);
    return { success: false, error: "Failed to generate project summary. Please try again." };
  }
}
