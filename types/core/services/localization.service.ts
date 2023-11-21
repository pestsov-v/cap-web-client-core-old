import {IAbstractService} from "./abstract.service";
import {I18n} from "@Packages/Types";

export interface ILocalizationService extends IAbstractService {
    readonly supportedLanguages: string[]
    readonly defaultLanguage: string

    addResources(ln: string, resources: I18n.Resource[]): void
    t(application: string, domain: string, ln: string, resource: string, substitutions?: Record<string, string>): void
}

export namespace NLocalizationService {
    export type Config = {
        supportedLanguages: string[]
        defaultLanguage: string
        fallbackLanguage: string
    }
    
    export type DcRecord = string | Dictionary
    export type Dictionary = Record<string, Dictionary>
    export type DomainDictionary = Map<string, Dictionary>
    export type ApplicationDictionary = Map<string, DomainDictionary>
}

