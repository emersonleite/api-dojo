import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.headers["user-agent"] as string;

    if (userAgent.includes("https://apidog.com")) {
      console.log("O agente é ApiDog");
    }
    next();

    res.on("finish", () => {
      console.log(
        "finalizou simple middleware. Console aparece depois do other",
      );
    });
  }
}
