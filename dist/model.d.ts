import type { UUID } from "crypto";
export declare enum EventType {
    log = "log",
    error = "error"
}
export interface Event {
    id: UUID;
    name: string;
    service: string;
    message: string;
    eventType: EventType;
}
export declare const events: Event[];
//# sourceMappingURL=model.d.ts.map