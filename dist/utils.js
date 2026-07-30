import { z, ZodType } from "zod";
export function validateBody(event) {
    return (req, res, next) => {
        const result = event.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error.issues });
        }
        req.body = result.data;
        next();
    };
}
export function validateQuery(queryZod) {
    return (req, res, next) => {
        const result = queryZod.safeParse(req.query);
        if (!result.success) {
            return res.status(400).json({ error: result.error.issues });
        }
        req.query = result.data;
        next();
    };
}
//# sourceMappingURL=utils.js.map