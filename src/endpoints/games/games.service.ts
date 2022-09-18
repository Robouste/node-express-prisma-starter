// run `npx prisma generate` for this type to be created
import { Game } from "@prisma/client";
import { DbContext } from "../../prisma/db-context";

export class GamesService {
	constructor(private _context: DbContext) {}

	public async findAll(): Promise<Game[]> {
		return await this._context.prisma.game.findMany();
	}

	public async find(id: string): Promise<Game | null> {
		return await this._context.prisma.game.findFirst({
			where: {
				id: id,
			},
		});
	}

	public async create(newGame: Game): Promise<Game> {
		return await this._context.prisma.game.create({
			data: {
				id: newGame.id,
				title: newGame.title,
			},
		});
	}

	public async update(id: string, gameToUpdate: Game): Promise<Game> {
		return await this._context.prisma.game.update({
			where: {
				id: id,
			},
			data: {
				title: gameToUpdate.title,
			},
		});
	}

	public async remove(id: string): Promise<Game> {
		return await this._context.prisma.game.delete({
			where: {
				id: id,
			},
		});
	}
}
