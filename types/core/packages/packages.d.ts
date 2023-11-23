import inversify from 'inversify';
import axios from 'axios';
import redux from '@reduxjs/toolkit';
import { UnknownObject } from '@Utility';
import { NoInfer } from '@reduxjs/toolkit/src/tsHelpers';

export namespace Inversify {
  export namespace interfaces {
    export type Bind = inversify.interfaces.Bind;
  }
}

export namespace Axios {
  export type AxiosInstance = axios.AxiosInstance;
  export type AxiosRequestConfig<D extends UnknownObject> = axios.AxiosRequestConfig<D>;
}

export namespace Redux {
  export type Store = redux.EnhancedStore;
  export type Action = redux.Action;
  export type SliceCaseReducers<STATE extends UnknownObject = UnknownObject> =
    redux.SliceCaseReducers<STATE>;
  export type Reducer<STATE extends UnknownObject = UnknownObject, ACTION = Action> = redux.Reducer<
    STATE,
    ACTION
  >;
  export type ExtraReducer<STATE extends UnknownObject = UnknownObject> = (
    builder: redux.ActionReducerMapBuilder<NoInfer<STATE>>
  ) => void;
}
