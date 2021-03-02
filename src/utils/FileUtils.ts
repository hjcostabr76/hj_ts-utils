import * as fs from 'fs'

import { AnyObjTP, MimeTypeEnum } from '@hjcostabr76/types'

import { InvalidArgsError } from '../error/InvalidArgsError'
import { StringUtils } from './StringUtils'

/**
 * UTILITARIOS para manipulacao de arquivos.
 */
export const FileUtils = {

    /**
     * Gera / sobrescreve 01 arquivo .json.
     * @throws
     */
    async saveJsonFile(json: AnyObjTP, savingPath: string): Promise<void> {
        const extension = '.json'
        const content = JSON.stringify(json, undefined, 4)
        savingPath = StringUtils.stripRepeatedEnding(`${savingPath}${extension}`, extension)
        await FileUtils.saveFile(content, savingPath)
    },

    /**
     * Gera / sobrescreve 01 arquivo generico.
     * @throws
     */
    async saveFile(content: string, savingPath: string): Promise<void> {
        await fs.promises.writeFile(savingPath, content, { encoding: 'utf8' })
    },

    /**
     * Le & retorna objeto extraido de 01 arquivo json.
     * @throws
     */
    async getObjFromJson<ObjGTP>(filePath: string): Promise<ObjGTP> {
        try {
            const fileContent = await fs.promises.readFile(filePath, { encoding: 'utf-8' })
            return JSON.parse(fileContent) as ObjGTP

        } catch (error) {
            throw new InvalidArgsError(`Falha ao tentar capturar objeto do arquivo "${filePath}"`, error)
        }
    },

    /** Avalia metadados disponiveis para determinar se tipo de 01 arquivo eh CSV. */
    isCsv(file: Blob, fileName?: string): boolean {

        const fileType = file.type
        if (fileType) {

            const csvMimes = [
                MimeTypeEnum.CSV_STANDARD,
                MimeTypeEnum.CSV_ALT1,
                MimeTypeEnum.CSV_ALT2,
                MimeTypeEnum.CSV_ALT3,
                MimeTypeEnum.CSV_ALT4,
                MimeTypeEnum.CSV_MICROSOFT,
            ]

            if ((csvMimes as string[]).includes(fileType))
                return true
        }

        if (fileName)
            return (fileType === MimeTypeEnum.TEXT && /(.*)\.csv$/.test(fileName))

        return false
    },
}
