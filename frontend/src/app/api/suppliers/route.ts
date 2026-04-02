import { NextResponse } from 'next/server';

const mockSuppliers = [
  { name: 'TechCorp Argentina', category: 'Hardware', risk: 'Low', status: 'Active', spend: 'USD 450k', rating: '4.8/5' },
  { name: 'Global Logistics', category: 'Shipping', risk: 'Medium', status: 'Reviewing', spend: 'USD 120k', rating: '4.2/5' },
  { name: 'OfficeMax Supply', category: 'Furniture', risk: 'Low', status: 'Active', spend: 'USD 85k', rating: '4.5/5' },
];

export async function GET() {
  return NextResponse.json(mockSuppliers);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newSupplier = {
    ...body,
    risk: 'Low',
    status: 'Pending',
    spend: 'N/A',
    rating: 'N/A'
  };
  return NextResponse.json(newSupplier, { status: 201 });
}
