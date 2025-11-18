import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateResidentDto } from "./dto/create-resident.dto";
import { UpdateResidentDto } from "./dto/update-resident.dto";
import { Resident } from "./entities/resident.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ResidentsService {
  constructor(
    @InjectRepository(Resident) // Injetando o repositório a partir de Resident (entidade)
    private readonly residentRepository: Repository<Resident>
  ) {}

  // relations: ["notices"] faz o carregamento eager (ansioso) dos avisos relacionados a cada morador,
  // evitando o problema N+1 queries e incluindo os dados completos na resposta de uma vez
  async findAll(): Promise<Resident[]> {
    return await this.residentRepository.find({ relations: ["notices"] });
  }

  async findOne(id: string): Promise<Resident> {
    const resident = await this.residentRepository.findOne({
      where: { id },
      relations: ["notices"],
    });
    if (!resident) {
      // Lança NotFoundException se o morador não for encontrado
      throw new NotFoundException(`Resident with ID ${id} not found.`);
    }
    return resident;
  }

  async create(residentDto: CreateResidentDto): Promise<Resident> {
    const isThereUserEmail = await this.residentRepository.findOne({
      where: { email: residentDto.email },
    });

    if (isThereUserEmail) {
      // Lança ConflictException para indicar conflito de dados (email duplicado)
      throw new ConflictException(
        `Resident with email ${residentDto.email} already exists.`
      );
    }

    const resident = this.residentRepository.create({
      ...residentDto,
      passwordHash: residentDto.password,
    });
    return this.residentRepository.save(resident);
  }

  /* Alternativa para create considerando a interceptação do erro */
  async create_alternative(residentDto: CreateResidentDto): Promise<Resident> {
    try {
      const resident = this.residentRepository.create({
        ...residentDto,
        passwordHash: residentDto.password,
      });
      await this.residentRepository.save(resident);
      return resident;
    } catch (error) {
      /* Captura o erro, e compara o código para retorno */
      if (error.driverError.errno === 19) {
        // Lança ConflictException se o erro for de unicidade (email duplicado)
        throw new ConflictException(
          `Resident with email ${residentDto.email} already exists.`
        );
      }
      throw error;
    }
  }

  async update(id: string, updateResidentDto: UpdateResidentDto) {
    /* Evitando que o email possa ser atualizado mesmo que esteja presente no DTO */
    if ("email" in updateResidentDto) {
      // Lança BadRequestException para impedir atualização do email
      throw new BadRequestException("Email cannot be updated");
    }

    const resident = await this.residentRepository.preload({
      id,
      ...updateResidentDto,
    });

    if (!resident) {
      throw new NotFoundException(`Resident with ID ${id} not found.`);
    }

    return this.residentRepository.save(resident);
  }

  async delete(id: string): Promise<Resident> {
    const resident = await this.residentRepository.findOneBy({ id });
    if (!resident) {
      // Lança NotFoundException se o morador não for encontrado para exclusão
      throw new NotFoundException(`Resident with ID ${id} not found.`);
    }
    await this.residentRepository.remove(resident);
    return resident;
  }

  async deleteAll() {
    await this.residentRepository.delete({});
  }
}
