// app/api/payment/route.ts
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();

    // Simulate validation and processing of card details
    if (!body.name || !body.number || !body.month || !body.cvc || !body.year) {
        return NextResponse.json({ error: "Invalid card information" }, { status: 400 });
    }
    if (body.number === '1234567890123456') {
        return NextResponse.json({ error: "Invalid card number" }, { status: 400 });
    }

    if (body.month === '2' && body.year === '2028') {
        return NextResponse.json({ error: "Expiration date cannot be in the past" }, { status: 400 });
    }
    // Simulate success response
    return NextResponse.json({ message: "Card updated successfully" }, { status: 200 });
}
