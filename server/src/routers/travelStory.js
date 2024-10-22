import { Router } from "express";
import { addTravelStory } from "../controllers/travelStory.js";
import { authenticateToken } from "../middleware/utilities.js";

const router = Router();

router.get("/add-travel-story", authenticateToken, addTravelStory);

export { router as travelStoryRouter };