import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const UrlParam = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const context = ctx.switchToHttp();

    const request: Request = context.getRequest();

    const { url } = request;

    return url;
  },
);
