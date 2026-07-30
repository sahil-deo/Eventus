import "dotenv/config";
import Router from "express";
import { EventSchema, EventsRequestSchema } from "./schema.js";
import { validateBody, validateQuery } from "./utils.js";
import { getEventCount, getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from "./service.js";
export const eventRouter = Router();
// Helper routes
eventRouter.get("/util/count", getEventCount);
// CRUD Routes
eventRouter.get("/", validateQuery(EventsRequestSchema), getAllEvents);
eventRouter.get("/:id", getEventById);
eventRouter.post("/", validateBody(EventSchema), createEvent);
eventRouter.put("/:id", validateBody(EventSchema), updateEvent);
eventRouter.delete("/:id", deleteEvent);
//# sourceMappingURL=routes.js.map