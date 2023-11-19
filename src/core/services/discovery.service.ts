import {Packages} from "@Packages";
const {injectable} = Packages.inversify
import {AbstractService} from "./abstract.service";

import {IDiscoveryService} from "@Core/Types";


@injectable()
export class DiscoveryService extends AbstractService implements IDiscoveryService {
    protected readonly _SERVICE_NAME = DiscoveryService.name
    protected readonly _discoveryService = this

    protected async init(): Promise<boolean> {
        console.log(process.env)

        return Promise.resolve(false);
    }

    protected async destroy(): Promise<void> {
    }
}