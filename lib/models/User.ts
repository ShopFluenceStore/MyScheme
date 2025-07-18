@@ .. @@
 import mongoose, { Schema, models } from "mongoose";

 const UserSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, unique: true, required: true },
   password: { type: String, required: true },
-  isAdmin: { type: Boolean, default: false },
+  role: { type: String, enum: ['user', 'admin'], default: 'user' },
+  avatar: { type: String, default: '' },
+  bio: { type: String, default: '' },
+  socialLinks: {
+    twitter: { type: String, default: '' },
+    linkedin: { type: String, default: '' },
+    github: { type: String, default: '' },
+    website: { type: String, default: '' }
+  },
+  isActive: { type: Boolean, default: true },
 }, { timestamps: true });

+// Index for faster queries
+UserSchema.index({ email: 1 });
+UserSchema.index({ role: 1 });
+
 const User = models.User || mongoose.model("User", UserSchema);
 export default User;