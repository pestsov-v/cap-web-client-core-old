import { Collect } from '../../../core/decorators/schema.decorators';
import { DomainNames } from '../domain-names';
import { AuthSymbols } from './auth.symbols';

@Collect(DomainNames.AUTH, {
  getaway: AuthSymbols.Getaway,
  slice: AuthSymbols.Slice,
})
export class AuthCollect {
}