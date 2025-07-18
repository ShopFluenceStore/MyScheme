import mongoose from "mongoose";

const SchemeSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  subCategory: String,
  launchDate: String,
  deadline: String,
  state: String,
  logo: String,
  isNew: Boolean,
  lastUpdated: String,
  bookmarks: Number,
  tags: [String],
  benefits: [String],
  eligibility: [String],
  documentsRequired: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slug: { type: String, unique: true, required: true },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  views: { type: Number, default: 0 },
  ministry: String,
  applyLink: String
}, { timestamps: true });

// Indexes for better performance
SchemeSchema.index({ slug: 1 });
SchemeSchema.index({ author: 1 });
SchemeSchema.index({ category: 1 });
SchemeSchema.index({ state: 1 });
SchemeSchema.index({ status: 1 });
SchemeSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default mongoose.models.Scheme || mongoose.model("Scheme", SchemeSchema);
