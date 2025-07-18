import { NextResponse } from "next/server";
import Scheme from "../../../../../lib/models/Scheme";
import dbConnect from "../../../../../lib/db";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    const scheme = new Scheme(data);
    await scheme.save();

    return NextResponse.json({ success: true, scheme });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Failed to save scheme." }, { status: 500 });
  }
}
