// src/common/http-exception.ts

export default class HttpException extends Error {
	public status?: number;

	constructor(public message: string, public statusCode?: number, public error?: string | null) {
		super(message);
	}
}
