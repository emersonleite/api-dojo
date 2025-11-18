import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  ParseUUIDPipe, // Pipe do NestJS que valida se o parâmetro é um UUID válido; lança BadRequestException se inválido
} from "@nestjs/common";
import { ResidentsService } from "./residents.service";
import { CreateResidentDto } from "./dto/create-resident.dto";
import { UpdateResidentDto } from "./dto/update-resident.dto";

/*
 * Exemplos de pipes do NestJS que podem ser usados em parâmetros ou corpo de requisições:
 * - ParseIntPipe: Converte string para número inteiro (ex.: @Param('id', ParseIntPipe) id: number)
 * - ParseFloatPipe: Converte string para número flutuante (ex.: @Param('price', ParseFloatPipe) price: number)
 * - ParseBoolPipe: Converte string para booleano (ex.: @Query('active', ParseBoolPipe) active: boolean)
 * - ParseUUIDPipe: Valida e converte para UUID (ex.: @Param('id', ParseUUIDPipe) id: string)
 * - ValidationPipe: Valida DTOs com regras definidas (usado globalmente em main.ts)
 * - DefaultValuePipe: Define valor padrão se parâmetro estiver ausente (ex.: @Query('limit', new DefaultValuePipe(10)) limit: number)
 */

/**
 * O controlador (ResidentsController) gerencia as rotas HTTP
 * relacionadas aos moradores e delega a lógica para o serviço (ResidentsService).
 */
@Controller("residents")
export class ResidentsController {
  constructor(private readonly residentsService: ResidentsService) {}

  /**
   * Lista todos os moradores.
   * @param filter - Parâmetro opcional para filtrar os resultados.
   * @returns Lista de moradores.
   */
  @Get()
  findAll(@Query("filter") filter?: string) {
    return this.residentsService.findAll();
  }

  /**
   * Busca um morador pelo ID.
   * @param id - ID do morador (UUID).
   * @returns O morador encontrado ou erro se não existir.
   */
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.residentsService.findOne(id);
  }

  /**
   * Cria um novo morador.
   * @param residentDto - Dados do morador a ser criado.
   * @returns O morador criado.
   */
  @Post()
  create(@Body() residentDto: CreateResidentDto) {
    return this.residentsService.create_alternative(residentDto);
  }

  /**
   * Atualiza parcialmente um morador.
   * @param id - ID do morador (UUID), validado pelo ParseUUIDPipe para garantir que seja um UUID válido.
   * @param updateResidentDto - Dados para atualização.
   * @returns O morador atualizado.
   */
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateResidentDto: UpdateResidentDto
  ) {
    return this.residentsService.update(id, updateResidentDto);
  }

  /**
   * Remove um morador pelo ID.
   * @param id - ID do morador.
   * @returns Confirmação de remoção (status 204).
   */
  @Delete(":id")
  @HttpCode(204)
  async remove(@Param("id") id: string) {
    return await this.residentsService.delete(id);
  }

  /**
   * Remove todos os moradores. Use com cautela, pois é irreversível.
   * @returns Confirmação de remoção.
   */
  @Delete()
  async removeAll() {
    return await this.residentsService.deleteAll();
  }
}
