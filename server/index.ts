import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import "./config/db/connections";
import UserRoutes from "./routes/user.routes";
import AuthRoutes from "./routes/auth.routes";

const app: Express = express();
const port = process.env.PORT || 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.get("/", (req: Request, res: Response) => {
  res.send("Mern auth ");
});
app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthRoutes);

app.all("*", (_req: Request, res: Response) => {
  const err = new Error("THe route you are looking for not found");
  return res.status(404).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
