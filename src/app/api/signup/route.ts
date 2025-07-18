import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import User from "../../../../lib/models/Users";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  try {
    await dbConnect();
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, message: "Email already exists" });
    }

    const user = await User.create({ name, email, password, isAdmin: false });
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Signup error", error });
  }
}
