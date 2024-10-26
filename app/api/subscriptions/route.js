
import { NextResponse } from "next/server";
import {getData} from "../../../lib/utils";
import fs from "fs";
import path from "path";


export async function GET() {
    try {
        const data = await getData('channel', fs, path);

        // Ensure data is an array and that elements 0 and 1 exist
        const array1 = (data && data[0] && data[0].subscribers) || [];
        const array2 = (data && data[1] && data[1].subscribers) || [];

        // Concatenate the arrays
        const subscriptions = [...array1, ...array2];

        return NextResponse.json(subscriptions, { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
