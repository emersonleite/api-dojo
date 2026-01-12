import { OmitType } from "@nestjs/mapped-types";
import { CreateNoticeDto } from "./create-notice.dto";

// OmitType: Cria um novo tipo removendo propriedades específicas de outro tipo
// Aqui, UpdateNoticeDto herda todos os campos de CreateNoticeDto EXCETO "createdBy"
// Útil para reutilizar validações e tipos, evitando duplicação de código
export class UpdateNoticeDto extends OmitType(CreateNoticeDto, ["createdBy"]) {}
