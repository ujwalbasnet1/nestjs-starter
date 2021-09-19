import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { ValidationError } from "class-validator";
import mongoose from 'mongoose';
import { CustomError } from "./custom-error";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;


    if (exception instanceof CustomError) {
      response.status(exception.statusCode).json({
        type: "Field Exceptions",
        ...exception.serializeErrors()
      });

    } else if (exception instanceof HttpException) {
      let error =
        exception?.getResponse()["message"] != null
          ? exception?.getResponse()["message"]
          : exception?.getResponse();

      response.status(status).json({
        type: "Http Exception",
        errors: Array.isArray(error) ? error : [error],
      });
    } else if (exception instanceof mongoose.Error.CastError) {
      response.status(500).json({
        message: exception.message,
      });
    } else if (exception instanceof mongoose.Error.ValidationError) {
      //Handle Mongoose Validation Errors
      const errorKeys = Object.keys(exception.errors);
      const errs: { message: string }[] = [];
      errorKeys.forEach((key) => errs.push({ message: exception.errors[key].message }));
      response.status(400).json({
        errors: errs,
      });
    }
    else {
      response.status(status).json({
        type: "Unknown Error",
        errors: [exception.toString()],
      });
    }
  }
}