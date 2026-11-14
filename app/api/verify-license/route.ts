import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { licenseKey } = await req.json();
    const cleanedKey = typeof licenseKey === "string" ? licenseKey.trim() : "";

    if (!cleanedKey) {
      return NextResponse.json(
        { valid: false, error: "Please enter a valid license key." },
        { status: 400 }
      );
    }

    const productSecretKey = process.env.PAYHIP_PRODUCT_KEY;
    if (!productSecretKey) {
      return NextResponse.json(
        { valid: false, error: "Server license configuration missing." },
        { status: 500 }
      );
    }

    const verifyUrl = `https://payhip.com{encodeURIComponent(
      cleanedKey
    )}`;

    const response = await fetch(verifyUrl, {
      method: "GET",
      headers: {
        "payhip-api-key": productSecretKey,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (response.ok && data?.data?.enabled === true) {
      return NextResponse.json({
        valid: true,
        message: "ListingBoost Pro unlocked! Enjoy your 100-Listing Pro Pass.",
      });
    }

    return NextResponse.json(
      { valid: false, error: "Invalid or disabled license key. Please check your key and try again." },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { valid: false, error: "Unable to verify license key right now." },
      { status: 500 }
    );
  }
}
