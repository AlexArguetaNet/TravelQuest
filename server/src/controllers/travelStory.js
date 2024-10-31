import TravelStory from "../models/travelStory.model.js";
import fs from "fs";
import path from "path";


export const addTravelStory = async (req, res) => {

    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const { userId } = req.user;

    if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
        return res.status(400).json({ error: true, msg: "All fields are required" });
    }

    // Convert visitedDate from milliseconds to a Date object
    const  parsedVisitedDate = new Date(parseInt(visitedDate));

    try {

        const travelStory = new TravelStory({

            title,
            story,
            visitedLocation,
            userId,
            imageUrl,
            visitedDate: parsedVisitedDate

        });

        await travelStory.save();
        res.status(201).json({ start: travelStory, msg: "New travel story created successfully" });

    } catch (err) {
        res.status(400).json({ err: true, msg: err.message });
    };

}

export const getAllTravelStories = async (req, res) => {

    const { userId } = req.user;

    try {
        const travelStories = await TravelStory.find({ userId: userId }).sort({ isFavorite: - 1});
        res.status(200).json({ stories: travelStories });
    } catch (err) {
        res.status(500).json({ err: true, msg: err.message });
    }

}

export const uploadImage = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({ err: true, msg: "No image uploaded" });
        }

        const imageUrl = `http://localhost:4001/uploads/${req.file.filename}`;
        res.status(201).json({ imageUrl });

    } catch (err) {
        res.status(500).json({ err: true, msg: err.message });
    }

}