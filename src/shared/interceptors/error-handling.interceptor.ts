import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { catchError, Observable, throwError } from "rxjs";

/**
 * Interceptor para tratamento e transformação de erros.
 *
 * Este interceptor captura erros lançados durante o processamento da requisição
 * e permite transformá-los antes de enviá-los ao cliente. Útil para:
 * - Transformar tipos de exceções (ex: NotFoundException -> BadRequestException)
 * - Adicionar contexto extra aos erros
 * - Padronizar formato de resposta de erro
 * - Log centralizado de erros
 *
 * Observação: Este interceptor usa RxJS operators (pipe, catchError) para
 * interceptar o fluxo de dados de forma reativa.
 */
@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Executa o handler e intercepta erros que possam ocorrer durante o processamento
    return next.handle().pipe(
      catchError((error) => {
        // Transforma o erro capturado em um novo erro customizado
        return throwError(() => {
          // Exemplo: converte NotFoundException em BadRequestException
          // Isso pode ser útil para ajustar o status HTTP ou mensagem de erro
          if (error.name === "NotFoundException") {
            return new BadRequestException(error.message);
          }
        });
      }),
    );
  }
}
