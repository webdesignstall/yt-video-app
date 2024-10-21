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

    const { username, email } = await req.json(); // parse the request body

    // Validate against the registration data from the JSON file
    const isUsernameTaken = registrationData.some(user => user.existingUser.username === username);
    const isEmailTaken = registrationData.some(user => user.existingUser.email === email);

    if (isUsernameTaken) {
        return NextResponse.json({ usernameError: "Username already taken" }, { status: 400 });
    }

    if (isEmailTaken) {
        return NextResponse.json({ emailError: "Email already taken" }, { status: 400 });
    }

    // Here you can add logic to create the user in your database

    return NextResponse.json({ message: "Account created successfully!" }, { status: 201 });
}
