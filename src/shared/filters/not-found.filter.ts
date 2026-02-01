import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from "@nestjs/common";

@Catch(NotFoundException)
export class NotFoundExceptionError<T extends NotFoundException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const response = context.getResponse();

    const exceptionResponse = exception.getResponse() as object;

    const statusCode = exception.getStatus();

    response.status(statusCode).json({
      ...exceptionResponse,
      message: "Não há nada aqui cara pálida ...",
    });
  }
}
