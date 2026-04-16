import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  tenant_id: { type: String, required: true, index: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  risk: { type: String, required: true, default: 'Low' },
  status: { type: String, required: true, default: 'Active' },
  spend: { type: String, default: 'N/A' },
  rating: { type: String, default: 'N/A' },
  alert: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.models.Supplier || mongoose.model('Supplier', SupplierSchema);
