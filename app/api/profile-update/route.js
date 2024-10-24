// app/api/payment/route.ts
import { NextResponse } from "next/server";
import {getData, storeData, updateData} from "../../../lib/utils";
import fs from "fs";
import path from "path";
import moment from "moment";

export async function POST(req) {
    const {username, email, bio, urls } = await req.json();

    // Simulate validation and processing of card details
    if (!username || !email || !bio) {
        return NextResponse.json({ error: "All field are required" }, { status: 400 });
    }

    const users = await getData('registration', fs, path);

    const user = users.find(user => user.id === users[0].id);


    // Check if usernameChangeableAt is more than 30 days in the past
    const isUsernameChangeable = moment(user?.usernameChangeableAt * 1000).isBefore( moment().subtract(30, 'days'));

    if (!isUsernameChangeable) {
        return NextResponse.json({ error: "You can only change your username once every 30 days." }, { status: 400 });
    }

    // Find the index of the channel by username
    const userIndex = users.findIndex(user => user.id === 1);

    // If the user doesn't exist, return a 404 error
    if (userIndex === -1) {
        return NextResponse.json({ error: "username not found" }, { status: 400 });
    }

    // Update the user with new data
    users[userIndex] = {
        ...users[userIndex], // Keep existing values
        username,
        email,
        bio,
        urls
    };

    const result = await updateData(users,username, 'registration', fs, path);

    if (result.success){
        // Simulate success response
        return NextResponse.json({ message: "profile update successfully" }, { status: 201 });
    }else {
        return NextResponse.json({ error: result?.message }, { status: 200 });
    }
}


export async function GET() {
    const data = await getData('channel', fs, path)

    return NextResponse.json({ data }, { status: 200 });
}
