import connectToDatabase from '../lib/mongodb';
import Negotiation from '../models/Negotiation';
import Supplier from '../models/Supplier';

const DEFAULT_TENANT = 'tenant_default';

const seedNegotiations = [
  {
    id: 'NEG-001',
    tenant_id: DEFAULT_TENANT,
    supplier_id: 'SUP-001',
    supplier: 'TechCorp Argentina',
    category: 'Laptops',
    stage: 'In Progress',
    risk: 'Low',
    saving: '8.5%',
    volume: 50,
    target_price: 800.0,
    max_price: 900.0,
    payment_terms: 'net_30',
    required_date: '2026-12-31',
    restrictions: '',
    ai_output: ''
  },
  {
    id: 'NEG-TEST',
    tenant_id: DEFAULT_TENANT,
    supplier_id: 'SUP-002',
    supplier: 'Global Logistics',
    category: 'Shipping',
    stage: 'AI Analysis Complete',
    risk: 'Medium',
    saving: '12.0%',
    volume: 12,
    target_price: 450.0,
    max_price: 550.0,
    payment_terms: 'net_60',
    required_date: '2026-11-15',
    restrictions: '',
    ai_output: ''
  },
  {
    id: 'NEG-003',
    tenant_id: DEFAULT_TENANT,
    supplier_id: 'SUP-003',
    supplier: 'OfficeMax B2B',
    category: 'Supplies',
    stage: 'Initial Offer',
    risk: 'Low',
    saving: '4.2%',
    volume: 500,
    target_price: 15.0,
    max_price: 18.0,
    payment_terms: 'net_15',
    required_date: '2026-10-01',
    restrictions: '',
    ai_output: ''
  }
];

const seedSuppliers = [
  { id: 'SUP-101', tenant_id: DEFAULT_TENANT, name: 'TechCorp Argentina', category: 'Hardware', risk: 'Low', status: 'Active', spend: 'USD 450k', rating: '4.8/5', alert: 'Market favorite' },
  { id: 'SUP-102', tenant_id: DEFAULT_TENANT, name: 'Global Logistics', category: 'Shipping', risk: 'Medium', status: 'Reviewing', spend: 'USD 120k', rating: '4.2/5', alert: null },
  { id: 'SUP-103', tenant_id: DEFAULT_TENANT, name: 'OfficeMax Supply', category: 'Furniture', risk: 'Low', status: 'Active', spend: 'USD 85k', rating: '4.5/5', alert: null },
  { id: 'SUP-104', tenant_id: DEFAULT_TENANT, name: 'EcoPower Solutions', category: 'Energy', risk: 'High', status: 'Pending', spend: 'USD 210k', rating: '3.9/5', alert: 'Renewal due' },
  { id: 'SUP-105', tenant_id: DEFAULT_TENANT, name: 'SaaS Connect', category: 'Software', risk: 'Low', status: 'Active', spend: 'USD 300k', rating: '4.9/5', alert: 'Strategic partner' }
];

/**
 * Seeds the database with demo data if the collections are empty.
 * Called lazily on the first API request after a fresh MongoDB start.
 */
export async function seedIfEmpty() {
  await connectToDatabase();

  const negCount = await Negotiation.countDocuments();
  if (negCount === 0) {
    console.log('🌱 Seeding negotiations...');
    await Negotiation.insertMany(seedNegotiations);
    console.log(`   ✅ Inserted ${seedNegotiations.length} negotiations.`);
  }

  const supCount = await Supplier.countDocuments();
  if (supCount === 0) {
    console.log('🌱 Seeding suppliers...');
    await Supplier.insertMany(seedSuppliers);
    console.log(`   ✅ Inserted ${seedSuppliers.length} suppliers.`);
  }
}
