import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Supplier from '@/models/Supplier';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const deleted = await Supplier.findOneAndDelete({ id });
    if (!deleted) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error('Supplier DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete supplier' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await request.json();

    const updated = await Supplier.findOneAndUpdate(
      { id },
      { 
        $set: { 
          name: body.name,
          category: body.category,
          risk: body.risk,
          status: body.status,
          updated_at: new Date()
        } 
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Supplier PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update supplier' }, { status: 500 });
  }
}
