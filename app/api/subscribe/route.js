import {NextResponse} from "next/server";
import {getData, storeData} from "../../../lib/utils";
import fs from "fs";
import path from "path";

export async function POST(req) {
    const { number_of_month, autoRenew, subscribe_for, username, channelId } = await req.json();

    // Validate inputs
    if (!number_of_month ||  !subscribe_for || !username || !channelId) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const getSubscribed = await getData('subscribed_channel', fs, path);

    const isSubscribed = getSubscribed.find(sub => sub.channelId === channelId);

    if (isSubscribed) {
        return NextResponse.json({ error: "You Already Subscribed" }, { status: 400 });
    }
    // Create a new comment object
    const newSubscribe = {username, channelId, number_of_month, autoRenew, subscribe_for};

    // Save updated data back to JSON storage
    const result = await storeData(newSubscribe, 'subscribed_channel', fs, path);


    if (result.success) {
        return NextResponse.json({ message: "Subscribed Successfully" }, { status: 201 });
    } else {
        return NextResponse.json({ error: result?.message }, { status: 500 });
    }
}

export async function GET() {
    const data = await getData('subscribed_channel', fs, path)

    return NextResponse.json(data || [], { status: 200 });
}