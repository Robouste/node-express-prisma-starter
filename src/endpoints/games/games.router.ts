/**
 * Required External Modules and Interfaces
 */

import { Game } from "@prisma/client";
import express, { Request, Response, Router } from "express";
import { context } from "../../prisma/db-context";
import { GamesService } from "./games.service";

export class GamesRouter {
	private static _router: Router;
	public static get router(): Router {
		if (this._router == null) {
			this.init();
		}

		return this._router;
	}

	private static init(): void {
		const service = new GamesService(context);
		this._router = express.Router();

		// GET games
		this.router.get("/", async (req: Request, res: Response) => {
			try {
				const games: Game[] = await service.findAll();

				res.status(200).send(games);
			} catch (e: any) {
				res.status(500).send(e.message);
			}
		});

		// GET games/:id
		this.router.get("/:id", async (req: Request, res: Response) => {
			const id: string = req.params.id;

			try {
				const game: Game | null = await service.find(id);

				if (game) {
					return res.status(200).send(game);
				}

				res.status(404).send("item not found");
			} catch (e: any) {
				res.status(500).send(e.message);
			}
		});

		// POST games
		this.router.post("/", async (req: Request, res: Response) => {
			try {
				const item: Game = req.body;

				const newItem = await service.create(item);

				res.status(201).json(newItem);
			} catch (e: any) {
				res.status(500).send(e.message);
			}
		});

		// PUT games/:id
		this.router.put("/:id", async (req: Request, res: Response) => {
			const id: string = req.params.id;

			try {
				const gameUpdate: Game = req.body;

				const existingItem: Game | null = await service.find(id);

				if (existingItem) {
					const updatedgame = await service.update(id, gameUpdate);
					return res.status(200).json(updatedgame);
				}

				const newgame = await service.create(gameUpdate);

				res.status(201).json(newgame);
			} catch (e: any) {
				res.status(500).send(e.message);
			}
		});

		// DELETE games/:id
		this.router.delete("/:id", async (req: Request, res: Response) => {
			try {
				const id: string = req.params.id;
				await service.remove(id);

				res.sendStatus(204);
			} catch (e: any) {
				res.status(500).send(e.message);
			}
		});
	}
}
