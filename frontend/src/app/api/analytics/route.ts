import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Negotiation from '@/models/Negotiation';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch all negotiations to calculate metrics
    const negotiations = await Negotiation.find({ tenant_id: 'tenant_default' }).lean();

    const totalCount = negotiations.length;
    
    // 1. Total Spend Volume Processed
    const totalVolume = negotiations.reduce((acc, neg) => {
      const vol = Number(neg.volume) || 0;
      const price = Number(neg.target_price) || 0;
      return acc + (vol * price);
    }, 0);

    // Format volume to millions (e.g. 2.4M)
    const formattedVolume = totalVolume > 1000000 
      ? `$${(totalVolume / 1000000).toFixed(1)}M` 
      : `$${(totalVolume / 1000).toFixed(1)}K`;

    // 2. Active Negotiations
    // Any status other than explicitly Approved/Completed or Rejected is considered Active
    const finalStatuses = ['Approved', 'Completed', 'Rejected'];
    const activeCount = negotiations.filter(neg => {
      const stage = (neg.stage || '').toLowerCase();
      // Ensure it's not matching final phrases simply mapping
      return !finalStatuses.some(s => stage.includes(s.toLowerCase()));
    }).length;

    // 3. Approval Rate
    const approvedCount = negotiations.filter(neg => {
      const stage = (neg.stage || '').toLowerCase();
      return stage.includes('approved') || stage.includes('completed');
    }).length;
    
    // Calculate rate (avoid NaN)
    const successRate = totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0;

    // Construct the KPIs Array mapping explicitly to the UI expected scheme
    const kpis = [
      { 
        metric: "Processed Spend", 
        value: formattedVolume, 
        target: "Volume", 
        color: "primary" 
      },
      { 
        metric: "Active Sessions", 
        value: activeCount.toString(), 
        target: "In Progress", 
        color: "tertiary" 
      },
      { 
        metric: "Approval Rate", 
        value: `${successRate}%`, 
        target: "Target < 100%", 
        color: successRate > 50 ? "secondary" : "error" 
      },
      { 
        metric: "Total Operations", 
        value: totalCount.toString(), 
        target: "Lifetime", 
        color: "secondary" 
      }
    ];

    // For now we preserve the chart data and opportunities as static mocks 
    // until we create specific collections for them in the future.
    const mockChartData = [40, 50, 45, 60, 55, 75, 70, 85, 80, 95];
    const mockOpportunities = [
      {
        "category": "Software",
        "color": "secondary",
        "insight": "Average market rate dropped by 12% in Q1. Renegotiating current SaaS contracts could yield $140K in immediate savings."
      },
      {
        "category": "Payment Terms",
        "color": "tertiary",
        "insight": "30% of vendors accepting net_30 could be moved to net_60 based on recent industry transaction data. Freeing up cash flow."
      },
      {
        "category": "Predictive Ordering",
        "color": "primary",
        "insight": "Consolidating purchases ahead of expected Q3 hardware cost spikes ensures budget compliance."
      }
    ];

    return NextResponse.json({
      kpis,
      chartData: mockChartData,
      opportunities: mockOpportunities
    });

  } catch (error) {
    console.error('API GET Error:', error);
    return NextResponse.json({ error: 'Failed to load analytics' }, { status: 500 });
  }
}
