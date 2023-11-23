import { HttpMethod, Nullable, StringObject, UnknownObject } from '../utility';
import { Redux } from '@/Packages/Types';

export interface ISchemaLoader {
  readonly domains: NSchemaLoader.Domains;
  readonly reducers: NSchemaLoader.Reducers;

  init(): Promise<void>;

  destroy(): Promise<void>;

  setDomain(domain: string): void;

  setGetaway(domain: string, routes: NSchemaLoader.Route): void;

  setSlice(domain: string, name: string, slice: NSchemaLoader.Slice<unknown>): void;
}

export namespace NSchemaLoader {
  export type ExtraReducer = Redux.ExtraReducer;
  export type Route<
    PATH extends string = string,
    BODY extends UnknownObject = UnknownObject,
    QUERY extends StringObject = StringObject,
    HEADERS extends StringObject = StringObject,
  > = {
    path: PATH;
    method: HttpMethod;
    query?: Nullable<QUERY>;
    headers?: Nullable<HEADERS>;
    body?: Nullable<BODY>;
    isPrivateUser?: boolean;
    isPrivateOrganization?: boolean;
  };

  export type Documents = {
    getaway?: symbol;
    slice?: symbol;
  };
  export type ControllerHandler<
    BODY extends UnknownObject = UnknownObject,
    QUERY extends StringObject = StringObject,
    HEADERS extends StringObject = StringObject,
  > = (body?: BODY, query?: QUERY, headers?: HEADERS) => Promise<void>;

  export type ControllerHandlers<
    NAME extends string,
    BODY extends UnknownObject = UnknownObject,
    QUERY extends StringObject = StringObject,
    HEADERS extends StringObject = StringObject,
  > = {
    [key in NAME]: ControllerHandler<BODY, QUERY, HEADERS>;
  };

  export type Slice<
    STATE extends UnknownObject = UnknownObject,
    REDUCERS extends { [key: string]: Redux.Reducer } = { [key: string]: Redux.Reducer },
    EXTRA_REDUCERS extends { [key: string]: ExtraReducer } = { [key: string]: ExtraReducer },
  > = {
    initialState: STATE;
    reducers?: STATE;
    extraReducers?: EXTRA_REDUCERS;
  };

  export type Slices = Record<string, Slice<unknown>>;

  export type Domain = {
    routes: Map<string, Omit<NSchemaLoader.Route, 'path'>>;
    slices: Map<string, NSchemaLoader.Slice<unknown>>;
    actions: Map<string, Redux.Action>;
  };
  export type Domains = Map<string, Domain>;
  export type ServiceStorage = Map<string, Domains>;
  export type Services = Map<string, ServiceStorage>;

  export type Reducers<STATE extends UnknownObject = UnknownObject> = {
    [key: string]: Redux.Reducer<STATE>;
  };
}
