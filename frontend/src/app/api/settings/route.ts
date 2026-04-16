import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Setting from '@/models/Setting';
import { seedIfEmpty } from '@/lib/seed';

const DEFAULT_TENANT = 'tenant_default';

export async function GET() {
  try {
    await connectToDatabase();
    await seedIfEmpty();

    let settings = await Setting.findOne({ tenant_id: DEFAULT_TENANT }).lean();
    if (!settings) {
      settings = await Setting.create({ tenant_id: DEFAULT_TENANT });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('API GET Error:', error);
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const updated = await Setting.findOneAndUpdate(
      { tenant_id: DEFAULT_TENANT },
      { ...body, updated_at: new Date() },
      { new: true, upsert: true }
    );
    
    return NextResponse.json({ success: true, message: 'Settings saved', data: updated });
  } catch (error) {
    console.error('API POST Error:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
