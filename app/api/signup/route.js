import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define the file path for the dummy database
const filePath = path.join(process.cwd(), 'cypress','fixtures', 'registration.json');

// Function to add new user data
async function addNewUser(username, email, password) {
    let data = [];

    // Check if the file exists and is readable
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        try {
            // Parse existing data if the file is not empty
            data = JSON.parse(fileContent);

            // Ensure the parsed data is an array
            if (!Array.isArray(data)) {
                data = [];  // If the parsed data is not an array, reinitialize it as an empty array
            }
        } catch (error) {
            console.error('Error parsing JSON data, initializing as empty array:', error);
            data = []; // Initialize as an empty array if there's a parsing error
        }
    }

    // Append new user data to the array
    const newUser = { username, email, password };
    data.push(newUser);

    // Try writing the updated data back to the file and return success/failure
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8'); // null, 2 is for pretty formatting
        return { success: true, message: "Account created successfully!" };
    } catch (error) {
        console.error("Error writing to file:", error);
        return { success: false, message: "Failed to store the user data." };
    }

}

export async function POST(req) {

    const { username, email, password } = await req.json(); // parse the request body

    let existingData = [];
    // Check if the file exists and is readable
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        try {
            // Parse existing data if the file is not empty
            existingData = JSON.parse(fileContent);

            // Ensure the parsed data is an array
            if (!Array.isArray(existingData)) {
                existingData = [];  // If the parsed data is not an array, reinitialize it as an empty array
            }
        } catch (error) {
            console.error('Error parsing JSON data, initializing as empty array:', error);
            existingData = []; // Initialize as an empty array if there's a parsing error
        }
    }

    const isUsernameTaken = existingData?.some(user => user.username === username);

    const isEmailTaken = existingData?.some(user => user.email === email);

    if (isUsernameTaken) {
        return NextResponse.json({ usernameError: "Username already taken" }, { status: 400 });
    }

    if (isEmailTaken) {
        return NextResponse.json({ emailError: "Email already taken" }, { status: 400 });
    }

// write seed users to seedUsers.json
    const store = await addNewUser(username, email, password);

    return NextResponse.json({store, existingData}, { status: 201 });
}
