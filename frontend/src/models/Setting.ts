import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISetting extends Document {
  tenant_id: string;
  max_auto_approval_limit: string;
  supplier_risk_tolerance: string;
  force_human_sign_off: boolean;
  strict_playbook_adherence: boolean;
  updated_at?: Date;
}

const SettingSchema: Schema = new Schema({
  tenant_id: { type: String, required: true, unique: true },
  max_auto_approval_limit: { type: String, default: "5,000.00" },
  supplier_risk_tolerance: { type: String, default: "low" },
  force_human_sign_off: { type: Boolean, default: true },
  strict_playbook_adherence: { type: Boolean, default: true },
  updated_at: { type: Date, default: Date.now },
});

const Setting: Model<ISetting> = mongoose.models.Setting || mongoose.model<ISetting>("Setting", SettingSchema);
export default Setting;
