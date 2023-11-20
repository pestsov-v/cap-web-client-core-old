import {Packages} from '@Packages'
import {AbstractService} from "./abstract.service";
const {injectable, inject} = Packages.inversify
import {CoreSymbols} from "@CoreSymbols";

import {IDiscoveryService, ILocalizationService} from "@Core/Types";

@injectable()
export class LocalizationService extends AbstractService implements ILocalizationService {
    protected readonly _SERVICE_NAME = LocalizationService.name

    constructor(
        @inject(CoreSymbols.DiscoveryService)
        protected readonly _discoveryService: IDiscoveryService
    ) {
        super();
    }

    protected async init(): Promise<boolean> {
        return true
    }

    protected async destroy(): Promise<void> {}
}