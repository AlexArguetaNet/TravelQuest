import { Router } from "express";
import { addTravelStory, getAllTravelStories } from "../controllers/travelStory.js";
import { authenticateToken } from "../middleware/utilities.js";

const router = Router();

router.post("/add-travel-story", authenticateToken, addTravelStory);
router.get("/get-all-travel-stories", authenticateToken, getAllTravelStories);

export { router as travelStoryRouter };