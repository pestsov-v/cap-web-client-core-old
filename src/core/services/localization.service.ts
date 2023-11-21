import {Packages} from '@Packages'
import {AbstractService} from "./abstract.service";
const {injectable, inject} = Packages.inversify
import {CoreSymbols} from "@CoreSymbols";

import {IDiscoveryService, ILocalizationService, NLocalizationService} from "@Core/Types";
import {I18n} from "@Packages/Types";

@injectable()
export class LocalizationService extends AbstractService implements ILocalizationService {
    protected readonly _SERVICE_NAME = LocalizationService.name
    private _config: NLocalizationService.Config | undefined
    private _dictionaries: NLocalizationService.ApplicationDictionary | undefined

    constructor(
        @inject(CoreSymbols.DiscoveryService)
        protected readonly _discoveryService: IDiscoveryService
    ) {
        super();
    }

    private _setConfig() {
        this._config = {
            defaultLanguage: 'en',
            fallbackLanguage: 'en',
            supportedLanguages: ['en']
        }
    }

    protected async init(): Promise<boolean> {

        this._setConfig()

        if (!this._config) throw this.throwConfigError()

        try {
            this._dictionaries = new Map<string, NLocalizationService.DomainDictionary>()
            return true
        } catch (e) {
            throw e
        }
    }

    protected async destroy(): Promise<void> {

        if (this._config) {
            this._config.supportedLanguages.forEach(ln => {
            })
        }

        this._config = undefined
    }

    public get supportedLanguages(): string[] {
        if (!this._config) throw this.throwConfigError()
        return this._config.supportedLanguages
    }

    public get defaultLanguage(): string {
        if (!this._config) throw this.throwConfigError()
        return this._config.defaultLanguage
    }

    public addResources(ln: string, resources: I18n.Resource[]): void {}

    public t(application: string, domain: string, ln: string, resource: string, substitutions?: Record<string, string>): string {
        if (!this._config) throw this.throwConfigError()

        if (!this._dictionaries) {
            throw new Error('Application dictionary map not initialize')
        }

        const appStorage = this._dictionaries?.get(application)
        if (!appStorage) {
            throw new Error(`No storage found for application "${application}"`);
        }

        const domainStorage = appStorage.get(domain)
        if (!domainStorage) {
            throw new Error(`Domain storage "${domain}" not found`)
        }

        let lnDictionary = domainStorage.get(ln)
        if (!lnDictionary) {
            lnDictionary = domainStorage.get(this._config.fallbackLanguage)
            if (!lnDictionary) {
                throw new Error(`Dictionary with language "${ln}" not found`)
            }
        }

        try {
            const keys = resource.split(':');
            let record: NLocalizationService.DcRecord = lnDictionary;

            if (keys.length > 1) {
                for (const key of keys) {
                    if (typeof record !== 'string') {
                        record = record[key];
                    } else {
                        if (substitutions) {
                            for (const substitution in substitutions) {
                                record = record.replace('{{' + substitution + '}}', substitutions[substitution]);
                            }
                        } else {
                            return record;
                        }
                    }
                }
            } else {
                return resource
            }
        } catch (e) {
            throw e;
        }

    }

    private throwConfigError() {
        return new Error('Config not set')
    }

}