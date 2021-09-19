import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { FieldError } from './field-exception';

@Injectable()
export class DTOValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new FieldError(this.formatErrors(errors));
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    private formatErrors(errors: ValidationError[]) {
        let _errorsList = {}

        errors.forEach(err => {
            const property = err.property
            _errorsList[property] = []

            for (let constraint in err.constraints) {
                _errorsList[property].push(err.constraints[constraint]);
            }

        })

        return _errorsList
    }
}
