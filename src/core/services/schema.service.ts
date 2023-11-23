import { Packages } from '@Packages';

const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { container } from '@Container';
import { MetadataKeys } from '@Common';
import { AbstractService } from './abstract.service';

import type { ISchemaService, IDiscoveryService, NSchemaLoader, ISchemaLoader } from '@Core/Types';

@injectable()
export class SchemaService extends AbstractService implements ISchemaService {
  protected readonly _SERVICE_NAME = SchemaService.name;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService
  ) {
    super();
  }

  private _reducers: NSchemaLoader.Reducers | undefined;

  public get reducers() {
    if (!this._reducers) {
      throw new Error('Reducers not set');
    }
    return this._reducers;
  }

  private _domains: NSchemaLoader.Domains | undefined;

  public get domains(): NSchemaLoader.Domains {
    if (!this._domains) {
      throw new Error('Domain storage does not set');
    }

    return this._domains;
  }

  protected async init(): Promise<boolean> {
    try {
      await this._runWorker();
      return true;
    } catch (e) {
      throw e;
    }
  }

  protected async destroy(): Promise<void> {
    this._reducers = undefined;
    this._domains = undefined;
  }

  private async _runWorker(): Promise<void> {
    const loader = container.get<ISchemaLoader>(CoreSymbols.SchemaLoader);

    try {
      await loader.init();
      Reflect.defineMetadata(MetadataKeys.SchemaLoader, loader, Reflect);
      try {
        await import('../../app');
        this._domains = loader.domains;
        this._reducers = loader.reducers;
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      await loader.destroy();
      throw e;
    }
  }
}
