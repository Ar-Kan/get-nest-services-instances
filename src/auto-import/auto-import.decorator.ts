import { InjectableOptions } from '@nestjs/common';
import { SCOPE_OPTIONS_METADATA } from '@nestjs/common/constants';
import { randomBytes } from 'crypto';
import { AUTO_IMPORT_METADATA } from './auto-import.model';

export const TestInjectable = (options?: InjectableOptions): ClassDecorator => {
  const name = randomBytes(20).toString('hex');
  return (target: object) => {
    Reflect.defineMetadata(AUTO_IMPORT_METADATA, name, target);
    /**Nest Injectable decorator */
    Reflect.defineMetadata(SCOPE_OPTIONS_METADATA, options, target);
  };
};
