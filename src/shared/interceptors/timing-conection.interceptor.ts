import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";

/**
 * Interceptor para medir o tempo de execução de requisições.
 *
 * Este interceptor calcula quanto tempo uma requisição leva para ser processada,
 * desde a entrada no controller até a geração da resposta. É útil para:
 * - Monitoramento de performance
 * - Identificação de endpoints lentos
 * - Debugging e otimização
 * - Logs de métricas (APM)
 *
 * O operador RxJS `tap` permite executar efeitos colaterais (como logs)
 * sem modificar o fluxo de dados da resposta.
 */
@Injectable()
export class TimingConectionInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Registra o tempo de início do processamento da requisição
    let startTime = Date.now();

    return next.handle().pipe(
      tap((/* data */) => {
        // Possibilidade de ter acesso aos dados
        // Calcula o tempo decorrido após a conclusão do processamento
        const finalTime = Date.now();
        const elapsedTime = finalTime - startTime;

        // Exibe o tempo de execução no console (em milissegundos)
        console.log(`Elapsed time ${elapsedTime / 1}ms`);

        // console.log(data); // Descomente para inspecionar os dados retornados pela rota
      }),
    );
  }
}
