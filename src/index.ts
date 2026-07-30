import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./db.js"
import {
    EventSchema,
    EventResponseSchema,
    EventsResponseSchema,
    EventsRequestSchema
} from "./schema.js"
import { validateBody } from "./utils.js"

const app = express();

// Middleware 
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Helper routes

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

app.get("/events/util/count", async (req, res) => {
    try {
        const count = await prisma.event.count();
        res.status(200).json({ count });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Unknown error" });
    }
});



// CRUD Routes

app.get("/events", async (req, res) => {

    const query = req.query
    const queryResult = EventsRequestSchema.safeParse(query)

    if (!queryResult.success) {
        return res.status(400).json({ error: queryResult.error.issues });
    }

    const nextId = queryResult.data.nextId;
    if (nextId !== undefined) {
        const exists = await prisma.event.findUnique({ where: { id: nextId } });
        if (!exists) {
            return res.status(404).json({ error: "Next Event not found" })
        }
    }

    const responseEvents = await prisma.event.findMany({
        take: 5,
        ...(nextId !== undefined && { skip: 1, cursor: { id: nextId } }),
        orderBy: { id: "desc" },
    });

    const newNextId = responseEvents.length === 5 ? responseEvents[responseEvents.length - 1]?.id : undefined;
    const response = { events: responseEvents, nextId: newNextId };
    const result = EventsResponseSchema.safeParse(response);

    if (!result.success) {
        return res.status(500).json({ error: result.error.issues });
    }
    res.status(200).json(response);
})

app.get("/events/:id", async (req, res) => {
    const id = String(req.params.id);
    const event = await prisma.event.findUnique({ where: { id: id } });
    if (!event) {
        return res.status(404).json({ error: "Event not found" })
    }

    const result = await EventResponseSchema.safeParse(event)
    if (!result.success) {
        return res.status(500).json({ error: result.error.issues })
    }
    res.json(event)
});

app.post("/events", validateBody(EventSchema), async (req, res) => {
    const newEvent = await prisma.event.create({ data: req.body });
    res.status(201).json(newEvent);
})

app.put("/events/:id", validateBody(EventSchema), async (req, res) => {
    const updatedEvent = await prisma.event
        .update({ where: { id: String(req.params.id) }, data: req.body, })
        .catch(() => null);

    if (!updatedEvent) {
        return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(updatedEvent);
})

app.delete("/events/:id", async (req, res) => {
    const id = String(req.params.id);
    const deleted = await prisma.event
        .delete({ where: { id: id } })
        .catch(() => null);

    if (!deleted) {
        return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "deleted", event: "deleted" });
});

const PORT = 8000

app.listen(PORT, () => {
    console.log("Server started on port 8000")
})

