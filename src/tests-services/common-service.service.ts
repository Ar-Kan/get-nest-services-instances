import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonServiceService {
  func_test() {
    return 'Imports also works';
  }
}
