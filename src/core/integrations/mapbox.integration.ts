import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { AbstractIntegration } from './abstract.integration';
import { CoreSymbols } from '@CoreSymbols';

import type { IMapboxIntegration, IDiscoveryService } from '@Core/Types';

@injectable()
export class MapboxIntegration extends AbstractIntegration implements IMapboxIntegration {
  protected readonly _INTEGRATION_NAME = MapboxIntegration.name;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService
  ) {
    super();
  }

  protected async init(): Promise<boolean> {
    return true;
  }

  protected async destroy(): Promise<void> {}
}
