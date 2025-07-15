import { NextResponse, type NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

const dataDir = path.join(process.cwd(), 'src/data');
const chatLeadsFilePath = path.join(dataDir, 'chatbot-leads.json');
const contactFormsFilePath = path.join(dataDir, 'contact-forms.json');

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

async function readData(filePath: string) {
    try {
        await fs.access(dataDir, fs.constants.F_OK).catch(async () => {
            await fs.mkdir(dataDir, { recursive: true });
        });
        await fs.access(filePath);
        const fileContents = await fs.readFile(filePath, 'utf-8');
        // Handle empty file case
        if (fileContents.trim() === '') {
            return [];
        }
        return JSON.parse(fileContents);
    } catch (error) {
        // If file doesn't exist, create it with an empty array
        await fs.writeFile(filePath, JSON.stringify([], null, 2));
        return [];
    }
}

async function writeData(filePath: string, data: any) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function POST(request: NextRequest) {
  const source = request.nextUrl.searchParams.get('source');

  try {
    const body = await request.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      console.error('Zod parsing error:', parsed.error.issues);
      return NextResponse.json({ message: 'Invalid data format', errors: parsed.error.issues }, { status: 400 });
    }
    
    if (parsed.data.source === 'Chatbot Lead' || source === 'chat') {
        const data = await readData(chatLeadsFilePath);
        const { sessionId, ...leadData } = parsed.data as z.infer<typeof ChatLeadSchema>;
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
        await writeData(chatLeadsFilePath, data);

    } else if (parsed.data.source === 'Contact Form' || source === 'forms') {
        const data = await readData(contactFormsFilePath);
        const { id, ...formData } = parsed.data as z.infer<typeof ContactFormSchema>;
        if (id) {
            const existingFormIndex = data.findIndex((item: any) => item.id === id && item.source === 'Contact Form');
            if (existingFormIndex > -1) {
                data[existingFormIndex] = { ...data[existingFormIndex], ...formData, updatedAt: new Date().toISOString() };
            }
        } else {
            const newEntry = {
                id: Date.now(),
                ...formData,
                status: 'New' as const,
                notes: '',
                createdAt: new Date().toISOString(),
            };
            data.push(newEntry);
        }
        await writeData(contactFormsFilePath, data);
    } else {
        return NextResponse.json({ message: 'Invalid source' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Success' }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Error saving data' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
    const source = request.nextUrl.searchParams.get('source');
    try {
        if (source === 'chat') {
            const data = await readData(chatLeadsFilePath);
            return NextResponse.json({ data }, { status: 200 });
        } else if (source === 'forms') {
            const data = await readData(contactFormsFilePath);
            return NextResponse.json({ data }, { status: 200 });
        } else {
            const chatData = await readData(chatLeadsFilePath);
            const formData = await readData(contactFormsFilePath);
            return NextResponse.json({ data: [...chatData, ...formData] }, { status: 200 });
        }
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
    }
}
