
import { NextResponse } from "next/server";
import {getData} from "../../../lib/utils";
import fs from "fs";
import path from "path";


export async function GET() {
    try {
        const channels = await getData('channel', fs, path);
        return NextResponse.json(channels, { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
