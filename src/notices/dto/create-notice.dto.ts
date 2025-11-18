import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, MaxLength, IsUUID } from "class-validator";

export class CreateNoticeDto {
  @IsString({ message: "Title must be a string." })
  @IsNotEmpty({ message: "Title cannot be empty." })
  @MaxLength(50, { message: "Title must not exceed 50 characters." })
  @Transform(({ value }) => value.trim())
  title: string;

  @IsString({ message: "Description must be a string." })
  @IsNotEmpty({ message: "Description cannot be empty." })
  @MaxLength(250, { message: "Description must not exceed 50 characters." })
  @Transform(({ value }) => value.trim())
  description: string;

  @IsString({ message: "Priority must be a string." })
  @IsNotEmpty({ message: "Priority cannot be empty." })
  @MaxLength(50, { message: "Priority must not exceed 50 characters." })
  @Transform(({ value }) => value.trim())
  priority: string;

  @IsString({ message: "Status must be a string." })
  @IsNotEmpty({ message: "Status cannot be empty." })
  @MaxLength(50, { message: "Status must not exceed 50 characters." })
  @Transform(({ value }) => value.trim())
  status: string;

  @IsString({ message: "CreatedBy must be a string." })
  @IsNotEmpty({ message: "CreatedBy cannot be empty." })
  @IsUUID(4, { message: "CreatedBy must be a valid UUID." })
  createdBy: string;
}
