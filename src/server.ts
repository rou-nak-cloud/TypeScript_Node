import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { dbConnect } from "./config/dbConnect.ts";
import todoRoute from "./routes/todoRoute.ts";

const app: Application = express();

const PORT: number = 9001;

app.use(express.json());
dbConnect();

app.get("/", (req: Request, res: Response): void => {
  res.send("Typescript server is running.");
});
app.use("/todo", todoRoute);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
