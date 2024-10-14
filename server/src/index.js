import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { userRouter } from "./routers/user.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/", userRouter);


mongoose.connect(process.env.MONGO_URI)
.then(() => {

    app.listen(PORT, () => {
        console.log(`Connected to MongoDb. Server running on PORT ${PORT}`);
    });

})
.catch(err => console.log(err));


export default app;