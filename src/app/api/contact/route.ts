import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Schema for a single chat message
const MessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  sender: z.enum(['bot', 'user', 'options']),
  options: z.array(z.string()).optional(),
});

// Schema for a chat lead, accepting a string _id
const ChatLeadSchema = z.object({
  _id: z.string().optional(),
  source: z.literal('Chatbot Lead'),
  name: z.string(),
  number: z.string(),
  sessionId: z.string(),
  messages: z.array(MessageSchema),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Schema for a contact form submission, accepting a string _id
const ContactFormSchema = z.object({
  _id: z.string().optional(),
  source: z.literal('Contact Form'),
  fullName: z.string(),
  email: z.string().email(),
  contact: z.string(),
  whatsapp: z.string(),
  location: z.string(),
  budget: z.number().optional(),
  message: z.string(),
  status: z.enum(['New', 'Contacted', 'In Progress', 'Closed']).optional(),
  notes: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

const RequestSchema = z.union([ChatLeadSchema, ContactFormSchema]);

export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const body = await request.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      console.error('API POST (Contact) Zod parsing error:', parsed.error.issues);
      return NextResponse.json({ message: 'Invalid data format', errors: parsed.error.issues }, { status: 400 });
    }

    const { source } = parsed.data;

    if (source === 'Chatbot Lead') {
        const collection = db.collection('chatLeads');
        const { _id, sessionId, ...leadData } = parsed.data;

        await collection.updateOne(
            { sessionId: sessionId },
            { 
                $set: { ...leadData, updatedAt: new Date().toISOString() },
                $setOnInsert: { createdAt: new Date().toISOString(), sessionId }
            },
            { upsert: true }
        );

    } else if (source === 'Contact Form') {
        const collection = db.collection('contactForms');
        const { _id, ...formData } = parsed.data;
        
        if (_id && ObjectId.isValid(_id)) {
            // Update existing form submission
            await collection.updateOne(
                { _id: new ObjectId(_id) },
                { $set: { ...formData, updatedAt: new Date().toISOString() } }
            );
        } else {
            // Create new form submission
            await collection.insertOne({ 
                ...formData,
                status: 'New',
                notes: '',
                createdAt: new Date().toISOString() 
            });
        }
    } else {
        return NextResponse.json({ message: 'Invalid source' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Success' }, { status: 201 });
  } catch (error) {
    console.error('API POST (Contact) Error:', error);
    return NextResponse.json({ message: 'Error saving data' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
    const source = request.nextUrl.searchParams.get('source');
    try {
        const db = await getDb();
        if (source === 'chat') {
            const data = await db.collection('chatLeads').find({}).sort({ createdAt: -1 }).toArray();
            return NextResponse.json({ data }, { status: 200 });
        } else if (source === 'forms') {
            const data = await db.collection('contactForms').find({}).sort({ createdAt: -1 }).toArray();
            return NextResponse.json({ data }, { status: 200 });
        } else {
             return NextResponse.json({ message: "Invalid or missing source parameter" }, { status: 400 });
        }
    } catch (error) {
        console.error('API GET (Contact) Error:', error);
        return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
    }
}
