
import { NextResponse } from "next/server";
import {getData} from "../../../lib/utils";
import fs from "fs";
import path from "path";


export async function GET() {
    try {
        const channel = await getData('channel', fs, path);
        // Ensure data is an array and that elements 0 and 1 exist
        const latest = (channel && channel[0] && {username: channel[0].username, videos:  channel[0].publicVideos} ) || [];
        const forYou = (channel && channel[1] && {username: channel[1].username, videos:  channel[1].publicVideos}) || [];

        return NextResponse.json({latest, forYou}, { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
