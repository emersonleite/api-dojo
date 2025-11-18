import { PartialType } from "@nestjs/mapped-types";
import { CreateResidentDto } from "./create-resident.dto";

/* PartialType herda a estrutura e os validadores do CreateResidentDto, mas torna todos os campos opcionais para atualizações */
export class UpdateResidentDto extends PartialType(CreateResidentDto) {}
