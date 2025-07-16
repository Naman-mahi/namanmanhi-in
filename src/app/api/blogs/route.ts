'use server';

import { NextResponse, type NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

const dataDir = path.join(process.cwd(), 'src/data');
const blogsFilePath = path.join(dataDir, 'blogs.json');

const BlogSchema = z.object({
    id: z.number().optional(), // Optional for new posts
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

async function readData(filePath: string) {
    try {
        await fs.access(filePath);
        const fileContents = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContents);
    } catch (error) {
        // If file doesn't exist, it's an issue for blogs.
        console.error("Error reading blogs.json:", error);
        return [];
    }
}

async function writeData(filePath: string, data: any) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 4));
}

export async function GET() {
    try {
        const data = await readData(blogsFilePath);
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error('API GET Error:', error);
        return NextResponse.json({ message: 'Error reading blog data' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsed = BlogSchema.safeParse({
            ...body,
            tags: Array.isArray(body.tags) ? body.tags : body.tags.split(',').map((t: string) => t.trim()),
        });

        if (!parsed.success) {
            console.error('Zod parsing error:', parsed.error.issues);
            return NextResponse.json({ message: 'Invalid data format', errors: parsed.error.issues }, { status: 400 });
        }

        const data = await readData(blogsFilePath);
        
        if (parsed.data.id) {
            // Update existing post
            const index = data.findIndex((post: any) => post.id === parsed.data.id);
            if (index > -1) {
                data[index] = parsed.data;
            } else {
                return NextResponse.json({ message: `Blog post with id ${parsed.data.id} not found.` }, { status: 404 });
            }
        } else {
            // Create new post
            const newPost = {
                ...parsed.data,
                id: Date.now(), // Assign a new ID
            };
            data.unshift(newPost); // Add to the beginning of the array
        }
        
        await writeData(blogsFilePath, data);

        return NextResponse.json({ message: 'Blog post saved successfully' }, { status: 201 });
    } catch (error) {
        console.error('API POST Error:', error);
        return NextResponse.json({ message: 'Error saving blog data' }, { status: 500 });
    }
}
