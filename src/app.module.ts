import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImportExplorerService } from './auto-import/import-explorer.service';
import { ImportRegistryService } from './auto-import/import-registry.service';
import { CommonServiceService } from './tests-services/common-service.service';
import {
  TestServiceOneService,
  TestServiceThreeService,
  TestServiceTwoService,
} from './tests-services/tests-services.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    ImportRegistryService, // The registry service can be defined in its related module
    ImportExplorerService, // The explorer service must be declared in the main module
    AppService,
    TestServiceOneService,
    TestServiceTwoService,
    TestServiceThreeService,
    CommonServiceService,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly explorer_service: ImportExplorerService,
    private readonly registry_service: ImportRegistryService,
  ) {}

  onModuleInit() {
    const algorithms = this.explorer_service.explore();
    algorithms.forEach((a) => {
      this.registry_service.register(a);
    });
  }
}
