import "dotenv/config";
import Router, {} from "express";
import { z } from "zod";
import { prisma } from "./db.js";
import { EventResponseSchema, EventsResponseSchema, EventsRequestSchema } from "./schema.js";
export const eventRouter = Router();
// Helper 
export async function getEventCount(req, res) {
    try {
        const count = await prisma.event.count();
        res.status(200).json({ count });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Unknown error" });
    }
}
// CRUD 
export async function getAllEvents(req, res) {
    const { nextId } = req.query;
    if (nextId !== undefined) {
        const exists = await prisma.event.findUnique({ where: { id: nextId } });
        if (!exists) {
            return res.status(404).json({ error: "Next Event not found" });
        }
    }
    const responseEvents = await prisma.event.findMany({
        take: 5,
        ...(nextId !== undefined && { skip: 1, cursor: { id: nextId } }),
        orderBy: { timestamp: "desc" },
    });
    const newNextId = responseEvents.length === 5 ? responseEvents[responseEvents.length - 1]?.id : undefined;
    const response = { events: responseEvents, nextId: newNextId };
    const result = EventsResponseSchema.safeParse(response);
    if (!result.success) {
        return res.status(500).json({ error: result.error.issues });
    }
    res.status(200).json(response);
}
export async function getEventById(req, res) {
    const id = String(req.params.id);
    const event = await prisma.event.findUnique({ where: { id: id } });
    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }
    const result = EventResponseSchema.safeParse(event);
    if (!result.success) {
        return res.status(500).json({ error: result.error.issues });
    }
    res.json(event);
}
export async function createEvent(req, res) {
    const newEvent = await prisma.event.create({ data: req.body });
    res.status(201).json(newEvent);
}
export async function updateEvent(req, res) {
    const updatedEvent = await prisma.event
        .update({ where: { id: String(req.params.id) }, data: req.body, })
        .catch(() => null);
    if (!updatedEvent) {
        return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(updatedEvent);
}
export async function deleteEvent(req, res) {
    const id = String(req.params.id);
    const deleted = await prisma.event
        .delete({ where: { id: id } })
        .catch(() => null);
    if (!deleted) {
        return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "deleted", event: "deleted" });
}
//# sourceMappingURL=service.js.map