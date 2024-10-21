import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
    // Path to the registration.json file
    const fixturePath = path.join(process.cwd(), 'cypress', 'fixtures', 'registration.json');

    // Read and parse the registration.json file
    let registrationData;
    try {
        const fileContents = fs.readFileSync(fixturePath, 'utf-8');
        registrationData = JSON.parse(fileContents);
    } catch (error) {
        return NextResponse.json({ error: "Error reading the registration.json file" }, { status: 500 });
    }

    const { email, password } = await req.json(); // parse the request body

    // Validate against the registration data from the JSON file
    const isWrongEmail = registrationData.some(user => user.email !== email);
    const isWrongPassword = registrationData.some(user => user.password !== password);

    if (isWrongEmail && isWrongPassword) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Here you can add logic to create the user in your database

    return NextResponse.json({ message: "Account created successfully!" }, { status: 201 });
}

