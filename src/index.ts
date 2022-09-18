import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { GamesRouter } from "./endpoints/games/games.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10);
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
/**
 * endpoints go here
 */
app.use("/api/games", GamesRouter.router);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
