import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
export declare function validateBody(event: ZodType): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare function validateQuery(queryZod: ZodType): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=utils.d.ts.map