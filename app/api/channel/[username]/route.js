
import { NextResponse } from "next/server";
import {getData} from "../../../../lib/utils";
import fs from "fs";
import path from "path";

export async function GET(request, { params }) {
    try {
        const { username } = params;

        const channels = await getData('channel', fs, path);

        const channel = channels.find(channel => channel.username === username);

        return NextResponse.json(channel ? channel : { message: 'Channel not found' }, { status: channel ? 200 : 404 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
