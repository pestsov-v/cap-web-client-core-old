import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { configureStore } = Packages.redux;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractService } from './abstract.service';

import type { Redux } from '@/Packages/Types';
import type { IDiscoveryService, ISchemaService, IStoreService } from '@Core/Types';

@injectable()
export class StoreService extends AbstractService implements IStoreService {
  protected readonly _SERVICE_NAME = StoreService.name;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.SchemaService)
    protected readonly _schemaService: ISchemaService
  ) {
    super();
  }

  private _store: Redux.Store | undefined;

  public get store() {
    if (!this._store) {
      throw new Error('Store not set');
    }

    return this._store;
  }

  protected async init(): Promise<boolean> {
    try {
      this._store = configureStore({
        reducer: { ...this._schemaService.reducers },
      });
    } catch (e) {}

    return true;
  }

  protected async destroy(): Promise<void> {}
}
