import inversify from 'inversify'
import {i18n, Resource as i18nResource} from "i18next";


export namespace Inversify {
    export namespace interfaces {
        export type Bind = inversify.interfaces.Bind;
    }
}

export namespace I18n {
    export type i18next = i18n
    export type Resource = i18nResource
}