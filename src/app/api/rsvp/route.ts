import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { attendance, guests } = body;

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (scriptUrl) {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attendance, guests }),
      });

      if (!response.ok) {
        console.error("Error pushing to Google Script:", await response.text());
      }
    } else {
      console.log("RSVP Received (No GOOGLE_SCRIPT_URL configured yet):", {
        attendance,
        guests,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error handling RSVP POST:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
