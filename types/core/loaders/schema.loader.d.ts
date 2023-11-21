import {HttpMethod, Nullable, StringObject, UnknownObject} from "../utility";

export interface ISchemaLoader {
    init(): Promise<void>
    deploy(): Promise<void>
    setDomain(domain: string): void

    setController(domain: string, path: string, routes: NSchemaLoader.ControllerHandler): void
}

export namespace NSchemaLoader {
    export type Route<
        BODY extends UnknownObject = UnknownObject,
        QUERY extends StringObject = StringObject,
        HEADERS extends StringObject = StringObject
    > = {
        method: HttpMethod;
        query: Nullable<QUERY>
        headers: Nullable<HEADERS>
        body: Nullable<BODY>
    };


    export type Documents = {
        getaway?: symbol
    }
    export type ControllerHandler< BODY extends UnknownObject = UnknownObject,
        QUERY extends StringObject = StringObject,
        HEADERS extends StringObject = StringObject
    > = (body?: BODY, query?: QUERY, headers?: HEADERS) => Promise<void>

    export type ControllerHandlers<NAME extends string, BODY extends UnknownObject = UnknownObject,
        QUERY extends StringObject = StringObject,
        HEADERS extends StringObject = StringObject
    > = {
        [key in NAME]: ControllerHandler<BODY, QUERY, HEADERS>
    }

    export type Domain = {
        controllers: Map<string, ControllerHandler>
    }
    export type Domains = Map<string, Domain>
    export type ServiceStorage = Map<string, Domains>
    export type Services = Map<string, ServiceStorage>
}