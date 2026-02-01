import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class OtherMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const host = req.headers["host"] as string;

    console.log("O host é " + host);

    next();

    res.on("finish", () => {
      console.log("finalizou other middleware");
    });
  }
}
