// app/api/payment/route.ts
import { NextResponse } from "next/server";
import {getData, storeAndUpdateData} from "../../../lib/utils";
import fs from "fs";
import path from "path";

export async function POST(req) {
    const {name, number, month, year, cvc} = await req.json();

    // Simulate validation and processing of card details
    if (!name || !number || !month || !cvc || !year) {
        return NextResponse.json({ error: "All field are required" }, { status: 400 });
    }

    const result = await storeAndUpdateData({name, number, month, year, cvc}, 'payment-card', fs, path);

    if (result.success){
        // Simulate success response
        return NextResponse.json({ message: "Card updated successfully" }, { status: 200 });
    }else {
        return NextResponse.json({ message: result?.message }, { status: 200 });
    }
}

export async function GET() {
    const data = await getData('payment-card', fs, path)

    return NextResponse.json({ data }, { status: 200 });
}
