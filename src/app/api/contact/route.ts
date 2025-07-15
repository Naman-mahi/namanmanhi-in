import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

const dataFilePath = path.join(process.cwd(), 'src/data/data.json');

// Define a schema for a single chat message
const MessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  sender: z.enum(['bot', 'user', 'options']),
  options: z.array(z.string()).optional(),
});

// Define a schema for a chat lead
const ChatLeadSchema = z.object({
  source: z.literal('Chatbot Lead'),
  name: z.string(),
  number: z.string(),
  sessionId: z.string(),
  messages: z.array(MessageSchema),
});

// Define a schema for a contact form submission
const ContactFormSchema = z.object({
  id: z.number().optional(),
  source: z.literal('Contact Form'),
  fullName: z.string(),
  email: z.string().email(),
  contact: z.string(),
  whatsapp: z.string(),
  location: z.string(),
  budget: z.number().optional(),
  message: z.string(),
  file: z.any().optional(),
  status: z.enum(['New', 'Contacted', 'In Progress', 'Closed']).optional(),
  notes: z.string().optional(),
});

// A union type for all possible request bodies
const RequestSchema = z.union([ChatLeadSchema, ContactFormSchema]);

async function readData() {
    try {
        await fs.access(dataFilePath);
        const fileContents = await fs.readFile(dataFilePath, 'utf-8');
        // Handle empty file case
        if (fileContents.trim() === '') {
            return [];
        }
        return JSON.parse(fileContents);
    } catch (error) {
        // If file doesn't exist, create it with an empty array
        await fs.writeFile(dataFilePath, JSON.stringify([], null, 2));
        return [];
    }
}

async function writeData(data: any) {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      console.error('Zod parsing error:', parsed.error.issues);
      return NextResponse.json({ message: 'Invalid data format', errors: parsed.error.issues }, { status: 400 });
    }

    const data = await readData();

    if (parsed.data.source === 'Chatbot Lead') {
        const { sessionId, ...leadData } = parsed.data;
        const existingLeadIndex = data.findIndex((item: any) => item.sessionId === sessionId && item.source === 'Chatbot Lead');

        if (existingLeadIndex > -1) {
            data[existingLeadIndex] = { ...data[existingLeadIndex], ...leadData, updatedAt: new Date().toISOString() };
        } else {
            data.push({
                id: Date.now(),
                ...leadData,
                sessionId,
                createdAt: new Date().toISOString(),
            });
        }
    } else if (parsed.data.source === 'Contact Form') {
        const { id, ...formData } = parsed.data;
        if (id) {
            // This is an update to an existing form submission
            const existingFormIndex = data.findIndex((item: any) => item.id === id && item.source === 'Contact Form');
            if (existingFormIndex > -1) {
                data[existingFormIndex] = { ...data[existingFormIndex], ...formData, updatedAt: new Date().toISOString() };
            }
        } else {
            // This is a new form submission
            const newEntry = {
                id: Date.now(),
                ...formData,
                status: 'New' as const,
                notes: '',
                createdAt: new Date().toISOString(),
            };
            data.push(newEntry);
        }
    }

    await writeData(data);

    return NextResponse.json({ message: 'Success' }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Error saving data' }, { status: 500 });
  }
}

export async function GET() {
    try {
        const data = await readData();
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
    }
}
