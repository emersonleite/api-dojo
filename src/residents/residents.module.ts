import { forwardRef, Module } from "@nestjs/common";
import { ResidentsService } from "./residents.service";
import { ResidentsController } from "./residents.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Resident } from "./entities/resident.entity";
import { NoticesModule } from "src/notices/notices.module";

/**
 * Módulo de moradores (ResidentsModule).
 * Cada módulo organiza lógica específica do aplicativo.
 * Ele registra o serviço e o controlador relacionados aos moradores.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Resident]),
    forwardRef(() => NoticesModule),
    // forwardRef resolve dependências circulares entre módulos, adiando a resolução da referência
  ],
  // Importa as entidades necessárias para o módulo e permite a criação da tabela no banco de dados
  controllers: [ResidentsController], // Define os controladores do módulo
  providers: [ResidentsService], // Define os provedores (services) do módulo
  exports: [ResidentsService], // Exporta o serviço para ser utilizado em outros módulos, por exemplo o módulo de notícias
})
export class ResidentsModule {}
