import {Packages} from '@Packages'
const {injectable} = Packages.inversify

import {IAbstractIntegration, IDiscoveryService} from "@Core/Types";

@injectable()
export abstract class AbstractIntegration implements IAbstractIntegration {
    protected abstract readonly _INTEGRATION_NAME: string
    protected abstract readonly _discoveryService: IDiscoveryService
    protected abstract init(): Promise<boolean>
    protected abstract destroy(): Promise<void>

    public async start() {
        if (await this.init()) {
            console.log(`${this._INTEGRATION_NAME} integration has been started.`)
        }
    }

    public async stop() {
        await this.destroy()
        console.log(`${this._INTEGRATION_NAME} integration has been stopped.`)
    }
}