import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class IsFromAgent implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const agent = request["headers"]["user-agent"];

    console.log("Agent " + agent);

    return agent?.includes("Apidog");
  }
}
