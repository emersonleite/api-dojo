import {
  IsString,
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsPhoneNumber,
  IsBoolean,
  IsOptional,
  IsEnum,
} from "class-validator";
// <--- Valor possível para expressões regulares:
/* Matches */

import { Transform } from "class-transformer";
import { Role } from "../../shared/enums";

/**
 * A classe `CreateResidentDto` é usada para transferir os dados necessários para
 * criar um novo morador. Validações específicas garantem a integridade dos dados.
 */
export class CreateResidentDto {
  @IsString({ message: "Apartment must be a string." })
  @MaxLength(50, { message: "Name must not exceed 50 characters." })
  @IsNotEmpty({ message: "Apartment cannot be empty." })
  apartment: string; // Número ou identificação do apartamento.

  @IsString({ message: "Building must be a string." })
  @IsNotEmpty({ message: "Building cannot be empty." })
  @MaxLength(50, { message: "Name must not exceed 50 characters." })
  @Transform(({ value }) => value.trim()) // Remove espaços em branco
  building: string; //  Nome ou identificação do prédio.

  @IsString({ message: "Name must be a string." })
  @IsNotEmpty({ message: "Name cannot be empty." })
  @MaxLength(50, { message: "Name must not exceed 50 characters." })
  @Transform(({ value }) => value.trim())
  name: string; // Nome do morador

  @IsEmail()
  @IsNotEmpty({ message: "Email cannot be empty." })
  @Transform(({ value }) => value.trim())
  email: string; // Email do morador

  @IsNotEmpty({ message: "Phone cannot be empty." })
  @IsPhoneNumber("BR")
  @Transform(({ value }) => value.trim())
  phone: string; // Telefone do morador

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 4,
    minSymbols: 1,
    minLowercase: 5,
  })
  @IsNotEmpty({ message: "Password cannot be empty." })
  @Transform(({ value }) => value.trim())
  password: string; // Senha do morador

  @IsBoolean({ message: "Active must be a boolean." })
  @IsOptional()
  active: boolean;

  @IsEnum(Role, { message: "Role must be a valid role (ADMIN or COMMON)" })
  role: Role;
}
