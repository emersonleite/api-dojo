import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { NoticesService } from "./notices.service";
import { CreateNoticeDto } from "./dto/create-notice.dto";
import { UpdateNoticeDto } from "./dto/update-notice.dto";
import { PaginationDto } from "src/shared/pagination.dto";
import { TimingConectionInterceptor } from "src/shared/interceptors/timing-conection.interceptor";

@Controller("notices")
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Post()
  create(@Body() createNoticeDto: CreateNoticeDto) {
    return this.noticesService.create(createNoticeDto);
  }

  @Get()
  @UseInterceptors(TimingConectionInterceptor) // Aplica o interceptor apenas nesta rota específica para medir o tempo de execução
  findAll(@Query() pagination?: PaginationDto) {
    return this.noticesService.findAll(pagination);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.noticesService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticesService.update(id, updateNoticeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.noticesService.delete(id);
  }
}
