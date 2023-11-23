import type { IAbstractService } from '@Core/Types';

export interface IGetawayService extends IAbstractService {}

export namespace NGetawayService {
  export type Config = {
    protocol: string;
    host: string;
    port: number;
  };
}
