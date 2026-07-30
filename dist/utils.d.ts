import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
export declare function createEvent(data: any): Event;
export declare function validateBody(event: ZodType): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=utils.d.ts.map