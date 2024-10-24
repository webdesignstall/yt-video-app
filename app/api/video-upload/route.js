// app/api/payment/route.ts
import { NextResponse } from "next/server";
import {getData, storeData, updateData} from "../../../lib/utils";
import fs from "fs";
import path from "path";

export async function POST(req) {
    const {id, filename, duration, thumbnail, created } = await req.json();

    // Simulate validation and processing of card details
    if (!id || !filename || !duration || !thumbnail) {
        return NextResponse.json({ error: "All field are required" }, { status: 400 });
    }

    const users = await getData('registration', fs, path);

    if (!users.length) {
        return NextResponse.json({error: "username not available"}, {status: 400});
    }

    const result = await storeData({id, userId: users[0]?.id, filename, duration, thumbnail, created }, 'video-upload', fs, path);

    if (result.success){
        // Simulate success response
        return NextResponse.json({ message: "Video upload successfully" }, { status: 201 });
    }else {
        return NextResponse.json({ error: result?.message }, { status: 200 });
    }
}

export async function PUT(req) {
    const {name, username, description, price_per_month, non_subscriber_access, avatar, header_background } = await req.json();


    // Simulate validation and processing of card details
    if (!name || !username || !description || !price_per_month || !non_subscriber_access) {
        return NextResponse.json({ error: "All field are required" }, { status: 400 });
    }

    // Fetch the existing channel data
    const channels = await getData('channel', fs, path);

    // Find the index of the channel by username
    const channelIndex = channels.findIndex(channel => channel.username === username);

    // If the channel doesn't exist, return a 404 error
    if (channelIndex === -1) {
        return NextResponse.json({ error: "Channel not found" }, { status: 404 });
    }

    // Update the channel with new data
    channels[channelIndex] = {
        ...channels[channelIndex], // Keep existing values
        name,                      // Update with new values
        description,
        price_per_month,
        option: non_subscriber_access,
        avatar,                    // Optional fields if provided
        header_background
    };

    // console.log(channels)

    const result = await updateData(channels,username, 'channel', fs, path);

    if (result.success){
        // Simulate success response
        return NextResponse.json({ message: "Channel updated successfully" }, { status: 201 });
    }else {
        return NextResponse.json({ error: result?.message }, { status: 200 });
    }
}

export async function GET() {
    const data = await getData('video-upload', fs, path)

    return NextResponse.json({ data }, { status: 200 });
}
