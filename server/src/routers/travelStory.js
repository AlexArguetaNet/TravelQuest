import { Router } from "express";
import { addTravelStory, getAllTravelStories, uploadImage } from "../controllers/travelStory.js";
import { authenticateToken } from "../middleware/utilities.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/add-travel-story", authenticateToken, addTravelStory);
router.get("/get-all-travel-stories", authenticateToken, getAllTravelStories);
router.post("/image-upload", upload.single("image"), uploadImage);

export { router as travelStoryRouter };