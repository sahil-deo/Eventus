import "dotenv/config";
import { type Request, type Response } from "express";
export declare const eventRouter: import("express-serve-static-core").Express;
export declare function getEventCount(req: Request, res: Response): Promise<void>;
export declare function getAllEvents(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getEventById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function createEvent(req: Request, res: Response): Promise<void>;
export declare function updateEvent(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteEvent(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=service.d.ts.map