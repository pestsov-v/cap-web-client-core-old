import { Redux } from '@/Packages/Types';
import { IAbstractService } from './abstract.service';

export interface IStoreService extends IAbstractService {
  readonly store: Redux.Store;
}

export namespace NStoreService {}
