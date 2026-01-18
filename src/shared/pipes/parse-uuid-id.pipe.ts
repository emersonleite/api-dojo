import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

/* Pipe de exemplo (somente). Não faz nada além de converter em string. Ele é usado globalmente (useGlobalPipes em main.ts)  */
@Injectable()
export class ParseUuidIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.data == "id") {
      return String(value);
    }
    return value;
  }
}
