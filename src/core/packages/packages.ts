import { injectable, inject, Container, ContainerModule } from 'inversify';
import axios, { AxiosStatic } from 'axios';
import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

export class Packages {
  public static get inversify() {
    return { injectable, inject, Container, ContainerModule };
  }

  public static get axios(): { axios: AxiosStatic } {
    return { axios };
  }

  public static get redux() {
    return {
      configureStore: configureStore,
      createSlice: createSlice,
      createAsyncThunk: createAsyncThunk,
      Provider: Provider,
    };
  }
}
