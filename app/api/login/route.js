import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {getData} from "../../../lib/utils";

export async function POST(req) {

    const { email, password } = await req.json(); // parse the request body

    const registrationData = await getData('registration', fs, path);
    console.log(registrationData);
    // Validate against the registration data from the JSON file
    const isWrongEmail = registrationData?.some(user => user.email !== email);
    const isWrongPassword = registrationData?.some(user => user.password !== password);

    if (isWrongEmail && isWrongPassword) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Here you can add logic to create the user in your database

    return NextResponse.json({ message: "Account created successfully!" }, { status: 201 });
}

