
'use server';

import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const BlogSchema = z.object({
    _id: z.string().optional(),
    id: z.number().optional(), // Old numeric ID from JSON
    slug: z.string().min(1, 'Slug is required.'),
    title: z.string().min(1, 'Title is required.'),
    author: z.string().min(1, 'Author is required.'),
    date: z.string().min(1, 'Date is required.'),
    tags: z.array(z.string()).min(1, 'At least one tag is required.'),
    image: z.string().url('Must be a valid URL.'),
    imageHint: z.string().optional(),
    excerpt: z.string().min(1, 'Excerpt is required.'),
    content: z.string().min(1, 'Content is required.'),
});

export async function GET() {
    try {
        const db = await getDb();
        const data = await db.collection('blogs').find({}).sort({ date: -1 }).toArray();
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error('API GET (Blogs) Error:', error);
        return NextResponse.json({ message: 'Error reading blog data' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const db = await getDb();
        const body = await request.json();
        
        const { _id, ...postData } = body;
        
        const parsed = BlogSchema.safeParse({
            ...postData,
            tags: Array.isArray(postData.tags) ? postData.tags : postData.tags.split(',').map((t: string) => t.trim()),
        });

        if (!parsed.success) {
            console.error('API POST (Blogs) Zod parsing error:', parsed.error.issues);
            return NextResponse.json({ message: 'Invalid data format', errors: parsed.error.issues }, { status: 400 });
        }
        
        const collection = db.collection('blogs');

        if (_id && ObjectId.isValid(_id)) {
            // Update existing post
            const result = await collection.updateOne(
                { _id: new ObjectId(_id) },
                { $set: parsed.data }
            );

            if (result.matchedCount === 0) {
                 return NextResponse.json({ message: `Blog post with id ${_id} not found.` }, { status: 404 });
            }
        } else {
            // Create new post
            await collection.insertOne(parsed.data);
        }
        
        return NextResponse.json({ message: 'Blog post saved successfully' }, { status: 201 });
    } catch (error) {
        console.error('API POST (Blogs) Error:', error);
        return NextResponse.json({ message: 'Error saving blog data' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id || !ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid blog post ID' }, { status: 400 });
        }

        const db = await getDb();
        const result = await db.collection('blogs').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Blog post deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('API DELETE (Blogs) Error:', error);
        return NextResponse.json({ message: 'Error deleting blog data' }, { status: 500 });
    }
}
