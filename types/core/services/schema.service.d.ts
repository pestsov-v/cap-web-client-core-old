import { IAbstractService } from './abstract.service';
import { NSchemaLoader } from '../loaders';

export interface ISchemaService extends IAbstractService {
  readonly domains: NSchemaLoader.Domains;
  readonly reducers: NSchemaLoader.Reducers;
}

export namespace NSchemaService {}
