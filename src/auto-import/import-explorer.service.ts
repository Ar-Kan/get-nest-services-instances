import { Injectable, Type } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { AUTO_IMPORT_METADATA, IAutoImport } from './auto-import.model';

/**
 * Finds all services with `AUTO_IMPORT_METADATA` metadata
 *
 * The explorer service must be declared in the main module
 */
@Injectable()
export class ImportExplorerService {
  constructor(private readonly modules_container: ModulesContainer) {}

  explore() {
    const modules = [...this.modules_container.values()];
    return this.flat_map<IAutoImport>(modules, (instance) =>
      this.filter_provider(instance, AUTO_IMPORT_METADATA),
    );
  }

  private flat_map<T>(
    modules: Module[],
    callback: (instance: InstanceWrapper) => Type<any> | undefined,
  ): Type<T>[] {
    const items = modules
      .map((module) => [...module.providers.values()].map(callback))
      .reduce((a, b) => a.concat(b), []);
    return items.filter((element) => !!element) as Type<T>[];
  }

  private filter_provider(
    wrapper: InstanceWrapper,
    metadataKey: string,
  ): Type<any> | undefined {
    const { instance } = wrapper;
    if (!instance) {
      return undefined;
    }
    return this.extract_metadata(instance, metadataKey);
  }

  private extract_metadata(instance: Object, metadataKey: string): Type<any> {
    if (!instance.constructor) {
      return;
    }
    const metadata = Reflect.getMetadata(metadataKey, instance.constructor);
    return metadata ? (instance.constructor as Type<any>) : undefined;
  }
}
