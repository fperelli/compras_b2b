import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.supplier) {
      return NextResponse.json({ error: 'Missing supplier info' }, { status: 400 });
    }

    const jsonDirectory = path.join(process.cwd(), 'src/data');
    const filePath = path.join(jsonDirectory, 'negotiations.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const negotiations = JSON.parse(fileContents);

    const newId = `NEG-${100 + negotiations.length + 1}`; // e.g. NEG-105

    const newNeg = {
      id: newId,
      supplier: body.supplier,
      supplier_id: body.supplier_id || "SUP-001",
      category: body.category || "General",
      volume: parseInt(body.volume) || 10,
      target_price: parseFloat(body.target_price) || 100.0,
      max_price: parseFloat(body.max_price) || 150.0,
      status: "In Progress",
      stage: "In Progress",
      risk: body.risk || "Medium",
      saving: "Pending"
    };

    negotiations.unshift(newNeg); // add to top
    await fs.writeFile(filePath, JSON.stringify(negotiations, null, 2), 'utf8');

    return NextResponse.json(newNeg, { status: 201 });
  } catch (error) {
    console.error('Create Negotiation API Error:', error);
    return NextResponse.json({ error: 'Failed to create negotiation' }, { status: 500 });
  }
}
