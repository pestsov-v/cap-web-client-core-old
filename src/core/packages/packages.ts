import {injectable, inject, Container, ContainerModule} from 'inversify'

export class Packages {
    public static get inversify() {
        return {injectable, inject, Container, ContainerModule}
    }
}