import {Packages} from '@Packages'
const {injectable} = Packages.inversify

import {ISchemaLoader, NSchemaLoader} from "@Core/Types";

@injectable()
export class SchemaLoader implements ISchemaLoader {
    private _applications: NSchemaLoader.Services | undefined
    private _domains: NSchemaLoader.Domains | undefined


    public async init(): Promise<void> {
        this._applications = new Map<string, NSchemaLoader.ServiceStorage>()
        this._domains = new Map<string, NSchemaLoader.Domain>()
    }

    public async deploy(): Promise<void> {
        this._applications = undefined
        this._domains = undefined
    }

    public setDomain(domain: string): void {
        if (!this._domains) throw this._throwDomainError()

        this._domains.set(domain, {
            controllers: new Map<string, NSchemaLoader.ControllerHandler>()
        })
    }

    public setController(domain: string, path: string, controller: NSchemaLoader.ControllerHandler): void {
        if (!this._domains) throw this._throwDomainError()

        const storage = this._domains.get(domain)
        if (!storage) {
            this.setDomain(domain)
            this.setController(domain, path, controller)
            return
        }

        storage.controllers.set(path, controller)
    }

    private _throwDomainError() {
        return new Error('Domain storages not initialize')
    }
}