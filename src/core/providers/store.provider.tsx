'use client';

import React from 'react';
import { Packages } from '@Packages';

const { injectable, inject } = Packages.inversify;
const { Provider } = Packages.redux;
import { CoreSymbols } from '@CoreSymbols';

import * as types from '@Core/Types';

@injectable()
export class StoreProvider {
  constructor(
    @inject(CoreSymbols.SchemaService)
    private readonly _storeService: types.IStoreService
  ) {}

  public getProvider({ children }: { children: React.ReactNode }): React.ReactElement {
    return <Provider store={this._storeService.store}>${children}</Provider>;
  }
}
