import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractConnector } from './abstract.connector';

import type {
  IDiscoveryService,
  IGetawayService,
  ILocalizationService,
  ILoggerService,
  ISchemaService,
  IServiceConnector,
  IStoreService,
} from '@Core/Types';

@injectable()
export class ServiceConnector extends AbstractConnector implements IServiceConnector {
  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.GetawayService)
    private readonly _getawayService: IGetawayService,
    @inject(CoreSymbols.LoggerService)
    private readonly _loggerService: ILoggerService,
    @inject(CoreSymbols.LocalizationService)
    private readonly _localizationService: ILocalizationService,
    @inject(CoreSymbols.SchemaService)
    private readonly _schemaService: ISchemaService,
    @inject(CoreSymbols.StoreService)
    private readonly _storeService: IStoreService
  ) {
    super();
  }

  public async start(): Promise<void> {
    try {
      await this._discoveryService.start();
      await this._loggerService.start();
      await this._schemaService.start();
      await this._storeService.start();
      await this._getawayService.start();
      await this._localizationService.start();
    } catch (e) {
      console.log(e);
    }
  }

  public async stop(): Promise<void> {
    try {
      await this._localizationService.stop();
      await this._getawayService.stop();
      await this._storeService.stop();
      await this._schemaService.stop();
      await this._loggerService.stop();
      await this._discoveryService.stop();
    } catch (e) {
      console.log(e);
    }
  }
}
