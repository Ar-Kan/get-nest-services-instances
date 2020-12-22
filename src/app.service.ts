import { Injectable } from '@nestjs/common';
import { ImportRegistryService } from './auto-import/import-registry.service';

@Injectable()
export class AppService {
  constructor(private readonly registry_service: ImportRegistryService) {}

  async show_result() {
    return this.registry_service.executes();
  }
}
