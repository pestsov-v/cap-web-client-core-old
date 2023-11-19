import {Packages} from "@Packages";
const { ContainerModule } = Packages.inversify;
import {CoreSymbols} from "@CoreSymbols";

import { Initiator } from '../initiator';
import {ServiceConnector} from '../connectors';
import {  DiscoveryService} from '../services';

import {Inversify} from "@Packages/Types";
import { IGetawayService, IInitiator, IServiceConnector} from "@Core/Types";
import {GetawayService} from "../services/getaway.service";
import {IDiscoveryService} from "../../../types/core/services/discovery.service";


export const WebClientModule = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  // Initiator
  bind<IInitiator>(CoreSymbols.Initiator).to(Initiator).inRequestScope();

  // Connectors
  bind<IServiceConnector>(CoreSymbols.ServiceConnector).to(ServiceConnector).inSingletonScope();

  // Services
  bind<IDiscoveryService>(CoreSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<IGetawayService>(CoreSymbols.GetawayService).to(GetawayService).inSingletonScope()
});
