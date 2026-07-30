import { randomUUID } from "crypto";
import { ZodType } from "zod";
export function createEvent(data) {
    return { id: randomUUID(), ...data };
}
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
//# sourceMappingURL=utils.js.map