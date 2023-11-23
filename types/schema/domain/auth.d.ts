import { NSchemaLoader } from '@Core/Types';
import { Redux } from '@/Packages/Types';
import { NUser } from './user';

export namespace NAuth {
  export type Getaway = 'v1/signup' | 'v1/login' | 'v1/logout';

  export type ExtraReducers = {
    'v1/signup': Redux.ExtraReducer<NUser.UserState>;
    'v1/login': Redux.ExtraReducer<NUser.UserState>;
    'v1/logout': Redux.ExtraReducer;
  };
  export type Slices = {
    'v1/auth': NSchemaLoader.Slice<NUser.UserState, void, ExtraReducers>;
  };
}
