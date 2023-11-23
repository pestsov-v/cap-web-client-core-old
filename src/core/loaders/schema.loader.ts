import { Packages } from '@Packages';

const { injectable } = Packages.inversify;
const { createSlice } = Packages.redux;

import { ISchemaLoader, NSchemaLoader } from '@Core/Types';
import { Redux } from '@/Packages/Types';
import { UnknownObject } from '../../../types/core/utility';

@injectable()
export class SchemaLoader implements ISchemaLoader {
  private _applications: NSchemaLoader.Services | undefined;
  private _domains: NSchemaLoader.Domains | undefined;

  public get domains(): NSchemaLoader.Domains {
    if (!this._domains) throw this._throwDomainError();
    return this._domains;
  }

  public get reducers(): NSchemaLoader.Reducers {
    if (!this._domains) throw this._throwDomainError();

    const slices: NSchemaLoader.Reducers = {};

    this._domains.forEach((domain) => {
      domain.slices.forEach((slice, name) => {
        const sl = createSlice<UnknownObject, Redux.SliceCaseReducers>({
          name: name,
          initialState: {},
          reducers: {},
          extraReducers: (builder) => {
            for (const extraReducer in slice.extraReducers) {
              const reducer = slice.extraReducers[extraReducer];
              reducer(builder);
            }
          },
        });

        const actions = sl.actions;
        // for (const action in actions) {
        //   domain.actions.set(action, actions[action]);
        // }

        slices[name] = sl.reducer;
      });
    });

    return slices;
  }

  public async init(): Promise<void> {
    this._applications = new Map<string, NSchemaLoader.ServiceStorage>();
    this._domains = new Map<string, NSchemaLoader.Domain>();
  }

  public async destroy(): Promise<void> {
    this._applications = undefined;
    this._domains = undefined;
  }

  public setDomain(domain: string): void {
    if (!this._domains) throw this._throwDomainError();

    this._domains.set(domain, {
      routes: new Map<string, Omit<NSchemaLoader.Route, 'path'>>(),
      slices: new Map<string, NSchemaLoader.Slice>(),
      actions: new Map<string, Redux.Action>(),
    });
  }

  public setGetaway(domain: string, route: NSchemaLoader.Route): void {
    if (!this._domains) throw this._throwDomainError();

    const storage = this._domains.get(domain);
    if (!storage) {
      this.setDomain(domain);
      this.setGetaway(domain, route);
      return;
    }

    const path = route.path + '{{' + route.method.toUpperCase() + '}}';
    storage.routes.set(path, route);
  }

  public setSlice(domain: string, name: string, slice: NSchemaLoader.Slice): void {
    if (!this._domains) throw this._throwDomainError();

    const storage = this._domains.get(domain);
    if (!storage) {
      this.setDomain(domain);
      this.setSlice(domain, name, slice);
      return;
    }

    storage.slices.set(name, slice);
  }

  private _throwDomainError() {
    return new Error('Domain storages not initialize');
  }
}
