import { Getaway } from '../../../core/decorators/schema.decorators';
import { AuthSymbols } from './auth.symbols';
import { NAuth } from '../../../../types/schema/domain/auth';

@Getaway<NAuth.Getaway>(AuthSymbols.Getaway, [
  {
    path: 'v1/signup',
    method: 'POST',
    isPrivateUser: false,
    isPrivateOrganization: false,
  },
  {
    path: 'v1/login',
    method: 'POST',
    isPrivateUser: false,
    isPrivateOrganization: false,
  },
  {
    path: 'v1/logout',
    method: 'GET',
    isPrivateUser: true,
    isPrivateOrganization: false,
  },
])
export class AuthGetaway {}
