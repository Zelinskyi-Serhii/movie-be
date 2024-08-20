import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDB } from "./utils/db";
import { movieRoute } from "./routes/movie.route";
import { fileUploadRoute } from "./routes/fileUpload.route";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

app.use("/movie", movieRoute);
app.use("/fileUpload", fileUploadRoute);

connectToDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
