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
});

export default mongoose.models.Scheme || mongoose.model("Scheme", SchemeSchema);
