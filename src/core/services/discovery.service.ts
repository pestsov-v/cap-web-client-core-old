import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { AbstractService } from './abstract.service';

import type { IDiscoveryService } from '@Core/Types';

@injectable()
export class DiscoveryService extends AbstractService implements IDiscoveryService {
  protected readonly _SERVICE_NAME = DiscoveryService.name;
  protected readonly _discoveryService = this;

  protected async init(): Promise<boolean> {
    return true;
  }

  protected async destroy(): Promise<void> {}
}
