import { Slice } from '../../../core/decorators/schema.decorators';
import { AuthSymbols } from './auth.symbols';
import { NAuth } from '../../../../types/schema/domain/auth';

@Slice<NAuth.Slices>(AuthSymbols.Slice, {
  'v1/auth': {
    initialState: {
      firstName: '',
      lastName: '',
    },
    extraReducers: {
      'v1/signup': (builder) => {
      },
      'v1/login': builder => {
      },
      'v1/logout': builder => {
      },
    },
  },
})
export class AuthSlicer {
}