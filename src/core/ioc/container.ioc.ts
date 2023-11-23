import 'reflect-metadata';
import { Packages } from '@Packages';
const { Container } = Packages.inversify;

import { WebClientModule } from './web-client.default.ioc.module';

const container = new Container();

container.load(WebClientModule);

export { container };
