import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI(); // Automatically uses process.env.OPENAI_API_KEY

export async function POST(req: Request) {
    try {
        const { cvText, jobText } = await req.json();

        if (!cvText || !jobText) {
            return NextResponse.json({ error: 'Missing CV or Job Text' }, { status: 400 });
        }

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: 'Missing API Key in server configuration.' }, { status: 500 });
        }

        const systemPrompt = `
You are the Executive Analysis Panel for a high-end tech recruitment firm. 
Your panel consists of three autonomous agents:
1. The CEO (Evaluates high-level strategic fit and professional trajectory)
2. The PM (Evaluates practical skill matrices, timelines, and execution potential)
3. The QA Lead (Deeply audits the CV for missing competencies, technical gaps, and red flags)

Your task is to collectively analyze the provided CV against the Target Job Description. 
You must output a strictly formatted JSON object matching this exact interface:
{
  "score": number, // an overall Career Power Index out of 100 representing the exact match strength
  "persona": {
    "label": string, // A two-to-three word premium sounding title (e.g., 'Strategic System Architect', 'The High-Potential Talent')
    "desc": string // A one-sentence sophisticated overview of their professional vector
  },
  "summary": string, // A short professional executive summary of the evaluation
  "matched": string[], // Array of EXACT relevant skills/technologies found in BOTH texts. Max 15 items.
  "growth": string[] // Array of critical skills/technologies missing from the CV but required by the job. Max 10 items.
}

Do not include any formatting or markdown tags outside the JSON block. Output ONLY valid JSON.
        `;

        const userPrompt = `
        TARGET JOB DESCRIPTION:
        ${jobText}

        CANDIDATE CV:
        ${cvText}
        `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Cost-effective but competent reasoning
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.2,
        });

        const rawData = completion.choices[0].message.content;
        
        if (!rawData) {
            throw new Error("No data returned from AI");
        }

        const parsedData = JSON.parse(rawData);

        // Sanity checks and defaults to ensure UI doesn't break
        const finalResults = {
            score: parsedData.score || 50,
            persona: {
                label: parsedData.persona?.label || "Unclassified Talent",
                desc: parsedData.persona?.desc || "A professional with unspecified core competencies.",
            },
            summary: parsedData.summary || "Analysis completed.",
            matched: Array.isArray(parsedData.matched) ? parsedData.matched : [],
            growth: Array.isArray(parsedData.growth) ? parsedData.growth : [],
        };

        return NextResponse.json(finalResults);

    } catch (error: any) {
        console.error("AI Analysis Error:", error.message);
        return NextResponse.json({ error: 'Failed to process AI analysis' }, { status: 500 });
    }
}
