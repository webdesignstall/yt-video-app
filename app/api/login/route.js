import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
    // Path to the registration.json file
    const fixturePath = path.join(process.cwd(), 'cypress', 'fixtures', 'login.json');

    // Read and parse the registration.json file
    let loginData;
    try {
        const fileContents = fs.readFileSync(fixturePath, 'utf-8');
        loginData = JSON.parse(fileContents);
    } catch (error) {
        return NextResponse.json({ error: "Error reading the registration.json file" }, { status: 500 });
    }

    const { email, password } = await req.json(); // parse the request body

    // Validate against the registration data from the JSON file
    const isWrongEmail = loginData.some(user => user.validUser.email !== email);
    const isWrongPassword = loginData.some(user => user.validUser.password !== password);

    if (isWrongEmail) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (isWrongPassword) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Here you can add logic to create the user in your database

    return NextResponse.json({ message: "Account created successfully!" }, { status: 201 });
}

