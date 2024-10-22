// app/api/payment/route.ts
import { NextResponse } from "next/server";
import {getData, storeData} from "../../../lib/utils";
import fs from "fs";
import path from "path";

export async function POST(req) {
    const {name, username, description, price_per_month, option } = await req.json();

    // Simulate validation and processing of card details
    if (!name || !username || !description || !price_per_month || !option) {
        return NextResponse.json({ error: "All field are required" }, { status: 400 });
    }

    const channels = await getData('channel', fs, path);

    const isUsernameExit = channels.find(channel => channel.username === username);

   if (isUsernameExit) {
       return NextResponse.json({ error: "username not available" }, { status: 400 });
   }

    const result = await storeData({name, username, description, price_per_month, option }, 'channel', fs, path);

    if (result.success){
        // Simulate success response
        return NextResponse.json({ message: "Channel created successfully" }, { status: 201 });
    }else {
        return NextResponse.json({ error: result?.message }, { status: 200 });
    }
}

export async function GET() {
    const data = await getData('channel', fs, path)

    return NextResponse.json({ data }, { status: 200 });
}
