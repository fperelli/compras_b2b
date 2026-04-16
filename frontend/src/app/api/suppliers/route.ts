import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Supplier from '@/models/Supplier';
import { seedIfEmpty } from '@/lib/seed';

const DEFAULT_TENANT = 'tenant_default';

export async function GET() {
  try {
    await connectToDatabase();
    await seedIfEmpty();

    const suppliers = await Supplier.find({ tenant_id: DEFAULT_TENANT })
      .sort({ created_at: -1 })
      .lean();

    return NextResponse.json(suppliers);
  } catch (error) {
    console.error('Suppliers GET Error:', error);
    return NextResponse.json({ error: 'Failed to load suppliers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const newSupplier = await Supplier.create({
      id: body.id || `SUP-${Date.now()}`,
      tenant_id: DEFAULT_TENANT,
      name: body.name,
      category: body.category || 'General',
      risk: 'Low',
      status: 'Pending',
      spend: 'N/A',
      rating: 'N/A',
      alert: null
    });

    return NextResponse.json(newSupplier, { status: 201 });
  } catch (error) {
    console.error('Suppliers POST Error:', error);
    return NextResponse.json({ error: 'Failed to create supplier' }, { status: 500 });
  }
}
