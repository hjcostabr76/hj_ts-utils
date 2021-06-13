import { UseRequestIdT } from '../reqmanager_types_public'
import { useRequest } from './UseRequest'
import { UseRequestHelper } from './UseRequestHelper'

/**
 * TODO: 2021-06-12 - ADD Descricao
 */
export class UseRequestDebuggingUtils {

    /* eslint-disable no-console */

    static start(identification: UseRequestIdT, debugId?: string): void {
        const id = UseRequestHelper.getIdString(identification, debugId)
        console.time(this.getTimingLabel(id))
        console.log(this.getDebugMsgLabel('START', id))
    }

    static end(identification: UseRequestIdT, debugId?: string): void { // eslint-disable-line @typescript-eslint/naming-convention
        const id = UseRequestHelper.getIdString(identification, debugId)
        console.timeEnd(this.getTimingLabel(id))
        console.log('-')
    }

    /**
     * Exibe contagem atualizada de chamadas para 01 mesma funcao.
     *
     * TODO: 2021-06-12 - Corrigir lint
     */
    static computeCalling(functionName: string, identification: UseRequestIdT, debugId?: string): void {
        console.count(this.getDebugMsgLabel(functionName, identification, debugId))
    }

    /* eslint-enable no-console */

    private static getTimingLabel(id: string): string {
        return this.getDebugMsgLabel('END', id)
    }

    private static getDebugMsgLabel(placementText: string, idString: string): string
    private static getDebugMsgLabel(placementText: string, identification: UseRequestIdT, debugId?: string): string

    private static getDebugMsgLabel(placementText: string, param2: UseRequestIdT | string, debugId?: string): string {
        const id = (typeof param2 === 'string') ? param2 : UseRequestHelper.getIdString(param2, debugId)
        return `${useRequest.name}-${id}: ${placementText}`
    }
}
