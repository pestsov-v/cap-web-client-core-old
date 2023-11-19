import 'reflect-metadata';
import {Packages} from "@Packages";
const { Container } = Packages.inversify;

// const mode = process.env.CAP_WEB_CLIENT_MODE ?? 'default';
// const modulePath = `./web-client.${mode}.ioc.module`;

import { WebClientModule } from './web-client.default.ioc.module';

const container = new Container();

container.load(WebClientModule);



export { container };
