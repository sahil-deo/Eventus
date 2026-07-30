import type { Request, Response, NextFunction } from "express"
import { z, ZodType } from "zod"

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

export function validateQuery(queryZod: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = queryZod.safeParse(req.query);
        if (!result.success) {
            return res.status(400).json({ error: result.error.issues });
        }
        res.locals.query = result.data;
        next();
    }
}

