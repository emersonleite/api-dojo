import { Global, Module } from "@nestjs/common";
import { UtilsService } from "./utils.service";

/**
 * Módulo de utilitários (UtilsModule).
 * @Global marca o módulo como global, disponibilizando seus exports em todos os módulos automaticamente.
 * Com @Global: importa uma vez no AppModule e usa em qualquer lugar sem importar novamente.
 * Sem @Global: precisaria importar UtilsModule no array imports[] de cada módulo que quiser usar o UtilsService.
 */
@Global()
@Module({
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
