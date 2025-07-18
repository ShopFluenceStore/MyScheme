import dbConnect from "../../../../lib/db";
import Scheme from "../../../../lib/models/Scheme";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const schemes = await Scheme.find().sort({ lastUpdated: -1 }); 
    return NextResponse.json({ success: true, schemes });
  } catch (error) {
    console.error("Error fetching schemes:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch schemes" }, { status: 500 });
  }
}
