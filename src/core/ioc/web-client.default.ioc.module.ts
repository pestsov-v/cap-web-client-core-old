import {Packages} from "@Packages";
const { ContainerModule } = Packages.inversify;
import {CoreSymbols} from "@CoreSymbols";

import { Initiator } from '../initiator';
import {IntegrationConnector, ServiceConnector} from '../connectors';
import {DiscoveryService, GetawayService, LocalizationService, LoggerService} from '../services';

import {Inversify} from "@Packages/Types";
import {
  IGetawayService,
  IInitiator,
  IServiceConnector,
  IDiscoveryService,
  ILoggerService,
  IMapboxIntegration, ILocalizationService, IFunctionalityAgent, ISchemaLoader
} from "@Core/Types";
import {MapboxIntegration} from "../integrations";
import {FunctionalityAgent} from "../agents";
import {SchemaLoader} from "../loaders/schema.loader";


export const WebClientModule = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  // Initiator
  bind<IInitiator>(CoreSymbols.Initiator).to(Initiator).inRequestScope();

  // Connectors
  bind<IServiceConnector>(CoreSymbols.ServiceConnector).to(ServiceConnector).inSingletonScope();
  bind<IMapboxIntegration>(CoreSymbols.IntegrationConnector).to(IntegrationConnector).inSingletonScope()

  // Integrations
  bind<IMapboxIntegration>(CoreSymbols.MapboxIntegration).to(MapboxIntegration).inSingletonScope()

  // Services
  bind<IDiscoveryService>(CoreSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<IGetawayService>(CoreSymbols.GetawayService).to(GetawayService).inSingletonScope()
  bind<ILoggerService>(CoreSymbols.LoggerService).to(LoggerService).inSingletonScope()
  bind<ILocalizationService>(CoreSymbols.LocalizationService).to(LocalizationService).inSingletonScope()

  // Agents
  bind<IFunctionalityAgent>(CoreSymbols.FunctionalityAgent).to(FunctionalityAgent).inTransientScope()

  // Loaders
  bind<ISchemaLoader>(CoreSymbols.SchemaLoader).to(SchemaLoader).inSingletonScope()
});
