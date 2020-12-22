import { Type } from '@nestjs/common';

export interface ISomeData {
  some_param: number;
}

/**
 * Interface which will be common to all our algorithms
 */
export interface IAutoImport {
  /**
   * Compute something
   */
  compute(param: ISomeData): Promise<any>;
}

export type AutoImportType = Type<IAutoImport>;

export const AUTO_IMPORT_METADATA = '__autoImportCode__';
