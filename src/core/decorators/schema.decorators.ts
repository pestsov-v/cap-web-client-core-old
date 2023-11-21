import {ISchemaLoader, NSchemaLoader} from "@Core/Types";
import {Nullable, StringObject, UnknownObject} from "../../../types/core/utility";
import {MetadataKeys} from "@Common";

export function Collect(domain: string, documents: NSchemaLoader.Documents) {
    return function <T extends { new (...args: any[]): {} }>(target: T) {
        Reflect.defineMetadata(domain, documents, Reflect);

    const loader = Reflect.getMetadata(MetadataKeys.SchemaLoader, Reflect) as ISchemaLoader;
    loader.setDomain(domain);

    if (documents.getaway) {
        const getaway = Reflect.getMetadata(documents.getaway, Reflect) as NSchemaLoader.ControllerHandlers<string>
        for (const path in getaway) {
            loader.setController(domain, path, getaway[path])
        }
    }

        return target;
    };
}

export function Getaway<
    N extends string,
    BODY extends UnknownObject = UnknownObject,
    QUERY extends StringObject = StringObject,
    HEADERS extends StringObject = StringObject
>(name: symbol, routes: {[key in N]: (body?: Nullable<BODY>, query?: Nullable<QUERY>, headers?: Nullable<HEADERS>) => Promise<any>}) {
    return function <T extends { new (...args: any[]): {} }>(target: T) {
        Reflect.defineMetadata(name, routes, Reflect);

        return target;
    };
}
