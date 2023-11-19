import {Packages} from '@Packages'
import { IGetawayService} from "@Core/Types";
import {AbstractService} from "./abstract.service";
import {CoreSymbols} from "@CoreSymbols";
import {IDiscoveryService} from "@Core/Types";
const {injectable, inject} = Packages.inversify

@injectable()
export class GetawayService  extends AbstractService implements  IGetawayService {
    protected readonly _SERVICE_NAME = GetawayService.name

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
        return Promise.resolve(undefined);
    }
}