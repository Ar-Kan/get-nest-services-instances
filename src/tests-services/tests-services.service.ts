import { TestInjectable } from 'src/auto-import/auto-import.decorator';
import { IAutoImport, ISomeData } from 'src/auto-import/auto-import.model';
import { CommonServiceService } from './common-service.service';

@TestInjectable()
export class TestServiceOneService implements IAutoImport {
  async compute(param: ISomeData): Promise<any> {
    return param.some_param + 1;
  }
}

@TestInjectable()
export class TestServiceTwoService implements IAutoImport {
  constructor(private common_service: CommonServiceService) {}

  async compute(param: ISomeData): Promise<any> {
    const something = this.common_service.func_test();
    console.log('TestServiceTwoService ~ compute ~ something:', something);

    return param.some_param + 2;
  }
}

@TestInjectable()
export class TestServiceThreeService implements IAutoImport {
  async compute(param: ISomeData): Promise<any> {
    return param.some_param + 3;
  }
}
