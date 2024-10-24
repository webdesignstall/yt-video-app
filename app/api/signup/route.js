import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getData, storeData } from '../../../lib/utils';

export async function POST(req) {

    const { username, email, password } = await req.json(); // Parse the request body

    const existingData = await getData('registration', fs, path);

// Check if username is taken
    const isUsernameTaken = existingData?.some(user => user.username === username);

// Check if email is taken
    const isEmailTaken = existingData?.some(user => user.email === email);

    if (isUsernameTaken) {
        return NextResponse.json({ usernameError: "Username already taken" }, { status: 400 });
    }

    if (isEmailTaken) {
        return NextResponse.json({ emailError: "Email already taken" }, { status: 400 });
    }

// Generate a unique ID for the user (you can use a library like uuid for more robust IDs)
    const id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

// Set usernameChangeableAt to current timestamp
    const usernameChangeableAt = Math.floor(Date.now() / 1000); // Current timestamp in seconds

// Store the user data with unique ID and usernameChangeableAt
    await storeData({ id, username, email, password, usernameChangeableAt }, 'registration', fs, path);

    return NextResponse.json({ success: true }, { status: 201 });

}
