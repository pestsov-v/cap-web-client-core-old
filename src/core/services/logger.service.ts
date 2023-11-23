import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractService } from './abstract.service';

import type { IDiscoveryService, ILoggerService } from '@Core/Types';

@injectable()
export class LoggerService extends AbstractService implements ILoggerService {
  protected readonly _SERVICE_NAME = LoggerService.name;

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
