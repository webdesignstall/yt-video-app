import { NextResponse } from "next/server";

export async function POST(req) {
    const { email, password } = await req.json(); // parse the request body

    // Here you can add logic to create the user in your database

    if (email === "invalid@example.com") {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (password !== "password123") {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
}
