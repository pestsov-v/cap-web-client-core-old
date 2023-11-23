import type { Redux } from '@/Packages/Types';
import type { IAbstractService } from './abstract.service';

export interface IStoreService extends IAbstractService {
  readonly store: Redux.Store;
}

export namespace NStoreService {}
