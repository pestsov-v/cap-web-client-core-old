import { Packages } from '@Packages';

const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import type { IInitiator, IDiscoveryService, IIntegrationConnector } from '@Core/Types';

@injectable()
export class Initiator implements IInitiator {
  constructor(
    @inject(CoreSymbols.ServiceConnector)
    private readonly _serviceConnector: IDiscoveryService,
    @inject(CoreSymbols.IntegrationConnector)
    private readonly _integrationConnector: IIntegrationConnector
  ) {}

  public async start(): Promise<void> {
    await this._serviceConnector.start();
    await this._integrationConnector.start();
  }

  public async stop(): Promise<void> {
    await this._integrationConnector.stop();
    await this._serviceConnector.stop();
  }
}
