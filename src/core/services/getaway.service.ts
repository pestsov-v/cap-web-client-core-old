import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { axios } = Packages.axios;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractService } from './abstract.service';
import { UnknownObject } from '@Utility';

import type { Axios } from '@/Packages/Types';
import type { IDiscoveryService, IGetawayService, NGetawayService } from '@Core/Types';

@injectable()
export class GetawayService extends AbstractService implements IGetawayService {
  protected readonly _SERVICE_NAME = GetawayService.name;
  private _config: NGetawayService.Config | undefined;
  private _axios: Axios.AxiosInstance | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService
  ) {
    super();
  }

  public async fetch<
    D extends UnknownObject = UnknownObject,
    R extends UnknownObject = UnknownObject,
  >(path: string, params?: {}): Promise<R> {
    if (!this._axios) {
      throw new Error('Axios instance does not initialize');
    }
    const options: Axios.AxiosRequestConfig<D> = {};
    const response = await this._axios.request(options);

    return response as R;
  }

  protected async init(): Promise<boolean> {
    this._setConfig();
    if (!this._config) throw this._throwConfigError();

    try {
      const { protocol, host, port } = this._config;
      this._axios = axios.create({ baseURL: `${protocol}://${host}:${port}` });

      return true;
    } catch (e) {
      throw e;
    }
  }

  protected async destroy(): Promise<void> {
    this._config = undefined;
    if (this._axios) {
      this._axios = undefined;
    }
  }

  private _setConfig() {
    this._config = {
      protocol: 'http',
      host: 'localhost',
      port: 11043,
    };
  }
}
