import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

/**
 * Interceptor que adiciona um cabeçalho customizado às respostas HTTP.
 *
 * Este interceptor é executado ANTES da resposta ser enviada ao cliente,
 * permitindo modificar os headers da response. É útil para adicionar
 * headers de segurança, CORS, tracking, etc.
 *
 * Pode ser aplicado:
 * - Globalmente (app.useGlobalInterceptors)
 * - No controller (@UseInterceptors no nível da classe)
 * - Em rotas específicas (@UseInterceptors no método)
 */
export class AddHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log("AddHeaderInterceptor");

    // Obtém o objeto de resposta HTTP do contexto de execução
    const response = context.switchToHttp().getResponse();

    // Adiciona um header customizado à resposta
    response.setHeader("X-Custom-Header", "Esse é um cabeçalho customizado");
    // throw new Error("Method not implemented."); // Exemplo de como interromper o fluxo

    // Passa o controle para o próximo handler na cadeia (controller/service)
    return next.handle();
  }
}
