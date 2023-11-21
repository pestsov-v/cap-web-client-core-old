import {Packages} from '@Packages'
const {injectable, inject} = Packages.inversify
const {axios} = Packages.axios
import {MetadataKeys} from "@Common";
import {container} from "@Container";
import {CoreSymbols} from "@CoreSymbols";
import {AbstractService} from "./abstract.service";

import {IGetawayService, ISchemaLoader, IDiscoveryService, NGetawayService} from "@Core/Types";
import {Axios} from "@Packages/Types";
import {UnknownObject} from "../../../types/core/utility";


@injectable()
export class GetawayService  extends AbstractService implements  IGetawayService {
    protected readonly _SERVICE_NAME = GetawayService.name
    private _config: NGetawayService.Config | undefined
    private _axios: Axios.AxiosInstance | undefined

    constructor(
        @inject(CoreSymbols.DiscoveryService)
        protected readonly _discoveryService: IDiscoveryService
    ) {
        super();
    }

    private _setConfig() {
        this._config = {
            protocol: 'http',
            host: 'localhost',
            port: 11043
        }
    }

    protected async init(): Promise<boolean> {
        this._setConfig()
        if (!this._config) throw this._throwConfigError()

        try {
            const {protocol, host, port } = this._config
            this._axios = axios.create({baseURL: `${protocol}://${host}:${port}`})

            await this._runWorker()
            return true
        } catch (e) {
            throw e
        }
    }

    protected async destroy(): Promise<void> {}

    private async _runWorker(): Promise<void> {
        const loader = container.get<ISchemaLoader>(CoreSymbols.SchemaLoader);

        await loader.init()
        Reflect.defineMetadata(MetadataKeys.SchemaLoader, loader, Reflect);

        try {
            await import ('../../app/domains/index')
            console.log(loader)
        } catch (e) {
            console.log(e)
        }
    }

    public async fetch<D extends UnknownObject = UnknownObject, R extends UnknownObject = UnknownObject>(path: string, params?: {}): Promise<R> {
        if (!this._axios) {
            throw new Error('Axios instance does not initialize')
        }
        const options: Axios.AxiosRequestConfig<D> = {}
        const response = await this._axios.request(options)

        console.log(response)

        return response as R
    }

    private _throwConfigError() {
        return new Error('Config not set')
    }
}