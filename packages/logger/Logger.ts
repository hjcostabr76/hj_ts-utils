import colors from 'colors'

import { DateFormatEnum } from '@system/enum/DateFormatEnum'
import { InvalidArgsError } from '@system/error/InvalidArgsError'
import { ILogger } from '@system/logging/ILogger'
import { LogLevelTP } from '@system/logging/LogLevelTP'
import { OrUndefinedTP } from '@system/type/OrUndefinedTP'
import { DateUtils } from '@system/utils/DateUtils'

/**
 * LOGGER
 * Centraliza emissao de logs da aplicacao.
 */
export class Logger implements ILogger {    // eslint-disable-line @typescript-eslint/naming-convention

    private static instances?: Map<OrUndefinedTP<string>, Logger>

    private readonly context?: string

    private constructor(context?: string) {
        this.context = context
    }

    static getInstance(context?: string): Logger {

        if (!this.instances)
            this.instances = new Map<OrUndefinedTP<string>, Logger>()

        if (!this.instances.get(context))
            this.instances.set(context, new Logger(context))

        return this.instances.get(context) as Logger
    }

    static info(...logs: any[]): void { // eslint-disable-line @typescript-eslint/naming-convention
        Logger.infoWithContext(undefined, ...logs)
    }

    static warn(...logs: any[]): void {
        Logger.warnWithContext(undefined, ...logs)
    }

    static error(...logs: any[]): void {    // eslint-disable-line @typescript-eslint/naming-convention
        Logger.errorWithContext(undefined, ...logs)
    }

    static divider(times = 2): void {
        for (let i = 0; i < times; i++)
            Logger.executeLogging(['\n'])
    }

    info(...logs: any[]): void {    // eslint-disable-line @typescript-eslint/naming-convention
        Logger.infoWithContext(this.context, ...logs)
    }

    warn(...logs: any[]): void {
        Logger.warnWithContext(this.context, ...logs)
    }

    error(...logs: any[]): void {   // eslint-disable-line @typescript-eslint/naming-convention
        Logger.errorWithContext(this.context, ...logs)
    }

    divider(times?: number): void { // eslint-disable-line class-methods-use-this
        Logger.divider(times)
    }

    private static infoWithContext(context?: string, ...logs: any[]): void {    // eslint-disable-line @typescript-eslint/naming-convention
        Logger.logWithContext('info', context, ...logs)
    }

    private static warnWithContext(context?: string, ...logs: any[]): void {
        Logger.logWithContext('warn', context, ...logs)
    }

    private static errorWithContext(context?: string, ...logs: any[]): void {   // eslint-disable-line @typescript-eslint/naming-convention
        Logger.logWithContext('error', context, ...logs)
    }

    private static logWithContext(level: LogLevelTP, context?: string, ...logs: any[]): void {  // eslint-disable-line @typescript-eslint/naming-convention

        let logFunction: Function
        let colorFunction: (input: string) => string

        switch (level) {
            case 'info':
                logFunction = console.log   // eslint-disable-line no-console
                colorFunction = colors.green
                break

            case 'warn':
                logFunction = console.warn  // eslint-disable-line no-console
                colorFunction = colors.yellow
                break

            case 'error':
                logFunction = console.error // eslint-disable-line no-console
                colorFunction = colors.red
                break

            default:
                throw new InvalidArgsError('LogLevel invalido')
        }

        const logPrefixes: string[] = [
            colorFunction(`[${level.toUpperCase()}]`),
            colors.green(`[${DateUtils.getFormatted(new Date(), DateFormatEnum.US_DATE_TIME_H_M_S)}]`).dim,
        ]

        if (context)
            logPrefixes.push(colors.gray(`[${context}]`))

        this.executeLogging(
            [
                ...logPrefixes,
                ...logs.map(log => colorFunction(log))
            ],
            logFunction
        )
    }

    private static executeLogging(logs: any[], logFunction?: Function): void {
        logFunction = logFunction ?? console.log    // eslint-disable-line no-console
        logFunction(...logs)
    }
}