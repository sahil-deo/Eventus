// In memory database

import type { UUID } from "crypto"

export enum EventType {
    log = "log",
    error = "error"
}

export interface Event {
    id: UUID,
    name: string,
    service: string,
    message: string
    eventType: EventType
}


export const events: Event[] = []
