import {Packages} from "@Packages";
const {injectable, inject} = Packages.inversify
import {CoreSymbols} from "@CoreSymbols";
import {AbstractConnector} from "./abstract.connector";

import {IDiscoveryService, IServiceConnector} from "@Core/Types";


@injectable()
export class ServiceConnector extends AbstractConnector implements IServiceConnector {
    constructor(
        @inject(CoreSymbols.DiscoveryService)
        private readonly _discoveryService: IDiscoveryService
    ) {
        super();
    }

    public async start(): Promise<void> {
        await this._discoveryService.start()
    }

    public async stop(): Promise<void> {
        await this._discoveryService.stop()
    }
}