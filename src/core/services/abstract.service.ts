import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import type { IAbstractService, IDiscoveryService } from '@Core/Types';

@injectable()
export abstract class AbstractService implements IAbstractService {
  protected abstract readonly _SERVICE_NAME: string;
  protected abstract readonly _discoveryService: IDiscoveryService;

  public async start(): Promise<void> {
    try {
      if (await this.init()) {
        const serviceName = this._SERVICE_NAME.endsWith('1')
          ? this._SERVICE_NAME.replace('1', '')
          : this._SERVICE_NAME;
        console.log(`${serviceName} service has been started.`);
      }
    } catch (e) {
      throw e;
    }
  }

  public async stop(): Promise<void> {
    try {
      await this.destroy();
      console.log(`${this._SERVICE_NAME} service has been stopped.`);
    } catch (e) {
      throw e;
    }
  }

  protected abstract init(): Promise<boolean>;

  protected abstract destroy(): Promise<void>;

  protected _throwConfigError() {
    return new Error('Config not set');
  }
}
