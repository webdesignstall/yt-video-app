import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getData, storeData } from '../../../lib/utils';

export async function POST(req) {

    const { username, email, password } = await req.json(); // parse the request body

    const existingData = await getData('registration', fs, path);

    const isUsernameTaken = existingData?.some(user => user.username === username);

    const isEmailTaken = existingData?.some(user => user.email === email);

    if (isUsernameTaken) {
        return NextResponse.json({ usernameError: "Username already taken" }, { status: 400 });
    }

    if (isEmailTaken) {
        return NextResponse.json({ emailError: "Email already taken" }, { status: 400 });
    }

    await storeData({username, email, password}, 'registration', fs, path);

    return NextResponse.json({success: true}, { status: 201 });
}
