import { z } from "zod";
export declare const EventSchema: z.ZodObject<{
    name: z.ZodString;
    service: z.ZodString;
    message: z.ZodString;
    eventType: z.ZodEnum<{
        [x: string]: string;
    }>;
    timestamp: z.ZodISODateTime;
}, z.core.$strip>;
export declare const EventResponseSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    service: z.ZodString;
    message: z.ZodString;
    eventType: z.ZodEnum<{
        [x: string]: string;
    }>;
    timestamp: z.ZodDate;
}, z.core.$strip>;
export declare const EventsResponseSchema: z.ZodObject<{
    nextId: z.ZodOptional<z.ZodUUID>;
    events: z.ZodArray<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        service: z.ZodString;
        message: z.ZodString;
        eventType: z.ZodEnum<{
            [x: string]: string;
        }>;
        timestamp: z.ZodDate;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const EventsRequestSchema: z.ZodObject<{
    nextId: z.ZodOptional<z.ZodUUID>;
}, z.core.$strip>;
//# sourceMappingURL=schema.d.ts.map