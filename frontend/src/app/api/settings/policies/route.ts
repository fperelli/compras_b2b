import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8000/api/v1';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tenant_id = searchParams.get('tenant_id') || 'tenant_default';

    const response = await fetch(`${BACKEND_URL}/policy/list?tenant_id=${tenant_id}`);
    if (!response.ok) {
      const err = await response.json();
      return NextResponse.json({ error: err.detail || 'Backend error' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Policy List Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tenant_id = searchParams.get('tenant_id') || 'tenant_default';
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'filename is required' }, { status: 400 });
    }

    const response = await fetch(
      `${BACKEND_URL}/policy/delete?tenant_id=${encodeURIComponent(tenant_id)}&filename=${encodeURIComponent(filename)}`,
      { method: 'DELETE' }
    );

    if (!response.ok) {
      const err = await response.json();
      return NextResponse.json({ error: err.detail || 'Backend error' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Policy Delete Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
