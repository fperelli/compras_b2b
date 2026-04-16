import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Negotiation from '@/models/Negotiation';
import { seedIfEmpty } from '@/lib/seed';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8000/api/v1';
const DEFAULT_TENANT = 'tenant_default';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    await seedIfEmpty();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const single = await Negotiation.findOne({ id, tenant_id: DEFAULT_TENANT }).lean();
      return single
        ? NextResponse.json(single)
        : NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const allData = await Negotiation.find({ tenant_id: DEFAULT_TENANT })
      .sort({ created_at: -1 })
      .lean();

    return NextResponse.json(allData);
  } catch (error) {
    console.error('API GET Error:', error);
    return NextResponse.json({ error: 'Failed to load negotiations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const negId = body.id || `NEG-${Date.now()}`;

    // 1. Preparation for FastAPI (aligning with PurchaseRequest schema)
    const payload = {
      request_id: negId,
      tenant_id: DEFAULT_TENANT,
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

    // 2. Call the AI Agent
    let aiOutput = '';
    try {
      const response = await fetch(`${BACKEND_URL}/negotiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        aiOutput = data.output || '';
      }
    } catch (agentError) {
      console.warn('⚠️ Agent unavailable, saving negotiation without AI output:', agentError);
    }

    // 3. Persist to MongoDB (Upsert if exists)
    const negData = {
      id: negId,
      tenant_id: DEFAULT_TENANT,
      supplier_id: payload.supplier_id,
      supplier: payload.supplier_name,
      category: payload.category,
      stage: aiOutput ? 'AI Analysis Complete' : 'Pending AI',
      risk: 'Calculated',
      saving: 'Pending',
      volume: payload.volume,
      target_price: payload.target_price,
      max_price: payload.max_price,
      payment_terms: payload.payment_terms,
      required_date: payload.required_date,
      restrictions: payload.restrictions,
      ai_output: aiOutput
    };

    const newNeg = await Negotiation.findOneAndUpdate(
      { id: negId, tenant_id: DEFAULT_TENANT },
      { $set: negData },
      { new: true, upsert: true }
    );

    return NextResponse.json(newNeg, { status: 201 });

  } catch (error) {
    console.error('API POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.id || !body.status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    const updated = await Negotiation.findOneAndUpdate(
      { id: body.id, tenant_id: DEFAULT_TENANT },
      { stage: body.status, updated_at: new Date() },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: 'Negotiation not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, status: body.status });
  } catch (error) {
    console.error('PUT API Error:', error);
    return NextResponse.json({ error: 'Failed to update negotiation' }, { status: 500 });
  }
}
