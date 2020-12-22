import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  AutoImportType,
  AUTO_IMPORT_METADATA,
  IAutoImport,
} from './auto-import.model';

/**
 * Default implementation to add other handlers into it
 *
 * is the class which will be responsible of registering all the algorithms and to return computed scores
 *
 * The registry takes advantages of the reflect-metadata package and lets your
 * register service types en allow you to fully rely on the NestJS dependency injection system.
 *
 * The registry service can be defined in its related module
 */
@Injectable()
export class ImportRegistryService {
  private readonly handlers = new Map<string, IAutoImport>();
  constructor(private readonly module_ref: ModuleRef) {}

  /**
   * Register a new handler
   *
   * With the `AutoImportType` Type, is now possible to create a method that can register these types instead of
   * instances and uses the `ModuleRef` service to retrieve the instance associated to the type
   * @param handler
   */
  register(handler: AutoImportType) {
    const instance = this.module_ref.get(handler, { strict: false });
    if (!instance) {
      return;
    }

    const target = this.reflect_handler_name(handler);
    if (!target) {
      throw new NotAcceptableException('Handler has no metadata');
    }

    this.handlers.set(target, instance);
  }

  private reflect_handler_name(handler: AutoImportType): string {
    return Reflect.getMetadata(AUTO_IMPORT_METADATA, handler);
  }

  async executes(): Promise<any> {
    const result: { [s: string]: any } = {};
    await Promise.all(
      Array.from(this.handlers).map(async ([name, instance]) => {
        result[name] = await instance.compute({ some_param: 0 });
      }),
    );
    return result;
  }
}
