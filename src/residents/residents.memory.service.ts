import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateResidentDto } from "./dto/create-resident.dto";
import { UpdateResidentDto } from "./dto/update-resident.dto";
import { Resident } from "./entities/resident.entity";

/**
 * O serviço (ResidentsService) é responsável por gerenciar os dados
 * e a lógica de negócios relacionados a moradores.
 * Aqui, utilizamos um armazenamento em memória como exemplo.
 */
@Injectable() // Decorador que marca esta classe como um provedor injetável
export class ResidentsService {
  private residents: Resident[] = []; // Simulação de um banco de dados em memória

  /**
   * Retorna todos os moradores cadastrados.
   */
  findAll(): Resident[] {
    return this.residents;
  }

  /**
   * Busca um morador pelo ID.
   * Lança uma NotFoundException se o morador não for encontrado.
   */
  findOne(id: string): Resident {
    const resident = this.residents.find((r) => r.id === id);
    if (!resident) {
      // Retorna erro HTTP 404 com uma mensagem personalizada
      throw new NotFoundException(`Resident with ID ${id} not found.`);
    }
    return resident;
  }

  generateUuid() {
    return crypto.randomUUID();
  }

  /**
   * Adiciona um novo morador.
   */
  create(residentDto: CreateResidentDto): Resident {
    const newResident = {
      ...residentDto,
      id: this.generateUuid(),
      passwordHash: residentDto.password,
      active: true,
      notices: [],
    };
    this.residents.push(newResident);
    return newResident;
  }

  /**
   * Atualiza parcialmente os dados de um morador existente.
   * Caso o morador não seja encontrado, uma exceção é lançada.
   */
  update(id: string, updateData: UpdateResidentDto): Resident {
    const resident = this.findOne(id);
    Object.assign(resident, updateData); // Atualiza apenas os campos fornecidos
    return resident;
  }

  /**
   * Remove um morador pelo ID.
   * Lança uma exceção caso o ID não exista.
   */
  delete(id: string): void {
    const index = this.residents.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new NotFoundException(`Resident with ID ${id} not found.`);
    }
    this.residents.splice(index, 1); // Remove o morador da lista
  }
}
