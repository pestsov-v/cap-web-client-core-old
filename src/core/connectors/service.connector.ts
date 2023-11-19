import {Packages} from "@Packages";
const {injectable, inject} = Packages.inversify
import {CoreSymbols} from "@CoreSymbols";
import {AbstractConnector} from "./abstract.connector";

import {IGetawayService, ILoggerService, IServiceConnector} from "@Core/Types";
import {IDiscoveryService} from '@Core/Types'


@injectable()
export class ServiceConnector extends AbstractConnector implements IServiceConnector {
    constructor(
        @inject(CoreSymbols.DiscoveryService)
        private readonly _discoveryService: IDiscoveryService,
        @inject(CoreSymbols.GetawayService)
        private readonly _getawayService: IGetawayService,
        @inject(CoreSymbols.LoggerService)
        private readonly _loggerService: ILoggerService
    ) {
        super();
    }

    public async start(): Promise<void> {
        await this._discoveryService.start()
        await this._loggerService.start()
            await this._getawayService.start()
    }

    public async stop(): Promise<void> {
        await this._getawayService.stop()
        await this._loggerService.stop()
        await this._discoveryService.stop()
    }
}