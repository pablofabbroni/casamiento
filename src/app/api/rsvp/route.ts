import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { attendance, guests } = body;

    const DEFAULT_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbxUi6dhWm-5DqxGeUe2iCAzUQB4UNWFoDCAbXpkoeEN219C3WE1B3V14wpQ38_OU1E8/exec";
    const scriptUrl =
      process.env.GOOGLE_SCRIPT_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
      DEFAULT_SCRIPT_URL;

    if (scriptUrl) {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attendance, guests }),
        redirect: "follow",
      });

      const responseText = await response.text();
      if (!response.ok) {
        console.error("Error pushing to Google Script:", responseText);
      } else {
        console.log("Successfully pushed to Google Script:", responseText);
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
