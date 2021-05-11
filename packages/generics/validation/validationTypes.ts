import { ValidationArguments, ValidationError, ValidationOptions } from 'class-validator'

/**
 * LABELS
 * Determina referencia para mensagens de erro utilizados pelas regras de validacao customizadas.
 *
 * NOTE: Variaveis no texto devem ser representadas pelo caracter '#'
 */
export type ValidationMsgT = {
    readonly isRequired: string,
    readonly isEmail: string,
    readonly isString: string,
    readonly hasNoChar: string,
    readonly minLength: string,
}

/** Parametros de configuracao dos decorators de validacao. */
export type ValidationDecoratorConfigT = Pick<ValidationOptions, 'each'> & {
    message: string | ((params: ValidationArguments) => string),
}

/** Resultado de uma validacao em caso de falha. */
export type ValidationErrorT = Pick<ValidationError, 'target' | 'property'> & {
    failedValue?: any,
    failedTests: Record<keyof ValidationMsgT, string>,
    nestedErrors?: ValidationErrorT[],
}
