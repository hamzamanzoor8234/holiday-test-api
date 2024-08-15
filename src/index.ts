import express, { Application, Request, Response } from "express";
import router from "./routes";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use("/", router);
const port: Number | string = process.env.PORT || 8000;
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
export default app;
