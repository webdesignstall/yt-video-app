import { NextResponse } from "next/server";

export async function POST(req) {
    const { username, email } = await req.json(); // parse the request body

    // Here you can add logic to create the user in your database

    if (username === "takenusername") {
        return NextResponse.json({ usernameError: "Username already taken" }, { status: 400 });
    }

    if (email === "takenemail@example.com") {
        return NextResponse.json({ emailError: "Email already taken" }, { status: 400 });
    }

    return NextResponse.json({ message: "Account created successfully!" }, { status: 201 });
}
