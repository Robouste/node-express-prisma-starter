import { PrismaClient } from "@prisma/client";

export interface DbContext {
	prisma: PrismaClient;
}

const prisma = new PrismaClient();

export const context: DbContext = {
	prisma: prisma,
};
