import {NextResponse} from "next/server";
import {getData, updateData} from "../../../lib/utils";
import fs from "fs";
import path from "path";

export async function POST(req) {
    const { username, videoId, comment } = await req.json();

    // Validate inputs
    if (!username || !videoId || !comment) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Load channels data
    const channels = await getData('channel', fs, path);

    // Find the channel by username
    const channel = channels?.find(channel => channel.username === username);
    if (!channel) {
        return NextResponse.json({ error: "Channel not found" }, { status: 404 });
    }

    // Find the video by videoId
    const video = channel?.publicVideos?.find(video => video.id === videoId);
    if (!video) {
        return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Create a new comment object
    const newComment = {
        author: {
            name: "@jony.ahmed",
            avatar: '../../../cypress/fixtures/images/slide2.png'
        },
        content: comment
    };

    // Add the new comment to the video's comments array
    video.comments.push(newComment);

    // Save updated data back to JSON storage
    const result = await updateData(channels, 'channel', fs, path);


    if (result.success) {
        return NextResponse.json({ message: "Comment added successfully" }, { status: 201 });
    } else {
        return NextResponse.json({ error: result?.message }, { status: 500 });
    }
}