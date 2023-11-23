import { MetadataKeys } from '@Common';

import type { ISchemaLoader, NSchemaLoader } from '@Core/Types';

export function Collect(domain: string, documents: NSchemaLoader.Documents) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(domain, documents, Reflect);

    const loader = Reflect.getMetadata(MetadataKeys.SchemaLoader, Reflect) as ISchemaLoader;
    loader.setDomain(domain);

    if (documents.getaway) {
      const getaway = Reflect.getMetadata(documents.getaway, Reflect) as NSchemaLoader.Route[];
      getaway.forEach((g) => loader.setGetaway(domain, g));
    }

    if (documents.slice) {
      const slices = Reflect.getMetadata(documents.slice, Reflect) as NSchemaLoader.Slices;
      for (const slice in slices) {
        loader.setSlice(domain, slice, slices[slice]);
      }
    }

    return target;
  };
}

export function Getaway<PATH extends string = string>(
  name: symbol,
  routes: NSchemaLoader.Route<PATH>[]
) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(name, routes, Reflect);

    return target;
  };
}

export function Slice<T extends NSchemaLoader.Slices>(name: symbol, configuration: T) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(name, configuration, Reflect);

    return target;
  };
}
