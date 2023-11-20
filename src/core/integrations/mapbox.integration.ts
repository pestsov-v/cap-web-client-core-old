import {Packages} from '@Packages'
import {AbstractIntegration} from "./abstract.integration";
import {CoreSymbols} from "@CoreSymbols";
import {IDiscoveryService, IMapboxIntegration} from "@Core/Types";
const {injectable, inject} = Packages.inversify

@injectable()
export class MapboxIntegration extends AbstractIntegration implements IMapboxIntegration {
    protected readonly _INTEGRATION_NAME = MapboxIntegration.name

    constructor(
        @inject(CoreSymbols.DiscoveryService)
        protected readonly _discoveryService: IDiscoveryService
    ) {
        super();
    }

    protected async init(): Promise<boolean> {
        return true
    }

    protected async destroy(): Promise<void> {
    }

}