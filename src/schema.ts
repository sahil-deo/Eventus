import { uuid, z, ZodType } from "zod"

const typeList = ["log", "error"]

export const EventSchema = z.object({
    name: z.string(),
    service: z.string(),
    message: z.string(),
    eventType: z.enum(typeList),
    timestamp: z.iso.datetime(),
});

export const EventResponseSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    service: z.string(),
    message: z.string(),
    eventType: z.enum(typeList),
    timestamp: z.date(),
});

export const EventsResponseSchema = z.object({
    nextId: z.uuid().optional(),
    events: z.array(EventResponseSchema),
});
export const EventsRequestSchema = z.object({
    nextId: z.uuid().optional()
})


