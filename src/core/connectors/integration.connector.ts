import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractConnector } from './abstract.connector';

import type { IIntegrationConnector, IMapboxIntegration } from '@Core/Types';

@injectable()
export class IntegrationConnector extends AbstractConnector implements IIntegrationConnector {
  constructor(
    @inject(CoreSymbols.MapboxIntegration)
    private readonly _mapboxIntegration: IMapboxIntegration
  ) {
    super();
  }

  public async start(): Promise<void> {
    await this._mapboxIntegration.start();
  }

  public async stop(): Promise<void> {
    await this._mapboxIntegration.stop();
  }
}
