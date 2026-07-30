import { randomUUID } from "crypto";
import type { Event } from "./model.js"
import type { Request, Response, NextFunction } from "express"
import { ZodType } from "zod"
import type { ParsedQs } from "qs";

export function createEvent(data: any): Event {
    return { id: randomUUID(), ...data };
}

export function validateBody(event: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = event.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error.issues });
        }
        req.body = result.data;
        next();
    }
}
