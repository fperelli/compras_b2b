import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8000/api/v1';

async function getNegotiationsData() {
  const jsonDirectory = path.join(process.cwd(), 'src/data');
  const fileContents = await fs.readFile(jsonDirectory + '/negotiations.json', 'utf8');
  return JSON.parse(fileContents);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const allData = await getNegotiationsData();

    if (id) {
      const single = allData.find((n: any) => n.id === id);
      return single 
        ? NextResponse.json(single) 
        : NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(allData);
  } catch (error) {
    console.error('API GET Error:', error);
    return NextResponse.json({ error: 'Failed to load negotiations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Preparation for FastAPI (aligning with PurchaseRequest schema)
    const payload = {
      request_id: body.id || `REQ-${Date.now()}`,
      supplier_id: body.supplier_id || 'SUP-001',
      supplier_name: body.supplier || 'Unknown Supplier',
      category: body.category || 'general',
      volume: body.volume || 10,
      target_price: body.target_price || 100.0,
      max_price: body.max_price || 120.0,
      payment_terms: body.payment_terms || 'net_30',
      required_date: body.required_date || '2026-12-31',
      restrictions: body.restrictions || ''
    };

    const response = await fetch(`${BACKEND_URL}/negotiate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.detail || 'Backend error' }, { status: response.status });
    }

    const data = await response.json();
    // Wrap the agent's 'output' into the expected frontend structure
    return NextResponse.json({
      id: data.request_id,
      supplier: payload.supplier_name,
      category: payload.category,
      stage: 'AI Analysis Complete',
      risk: 'Calculated',
      saving: 'Pending',
      ai_output: data.output // The raw markdown from Gemini
    }, { status: 201 });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
