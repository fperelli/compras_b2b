import mongoose from 'mongoose';

const NegotiationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Mantenemos el ID 'NEG-XXX' manual por ahora para matching con UI
  tenant_id: { type: String, required: true, index: true }, // SaaS filter
  supplier: { type: String, required: true },
  supplier_id: { type: String, required: true },
  category: { type: String, required: true },
  stage: { type: String, required: true },
  risk: { type: String, required: true },
  saving: { type: String, required: true },
  volume: { type: Number, default: 0 },
  target_price: { type: Number, default: 0 },
  max_price: { type: Number, default: 0 },
  payment_terms: { type: String, default: '' },
  required_date: { type: String, default: '' },
  restrictions: { type: String, default: '' },
  ai_output: { type: String }, // Raw markdown strategy
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.models.Negotiation || mongoose.model('Negotiation', NegotiationSchema);
