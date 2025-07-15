import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/data.json');

export async function POST(request: Request) {
  try {
    const body = await request.json();

    let data = [];
    try {
      const fileContents = await fs.readFile(dataFilePath, 'utf-8');
      data = JSON.parse(fileContents);
    } catch (error) {
      console.log("Could not read data.json, will create a new one.");
    }
    
    const newEntry = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    data.push(newEntry);

    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: 'Success', data: newEntry }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Error saving data' }, { status: 500 });
  }
}
