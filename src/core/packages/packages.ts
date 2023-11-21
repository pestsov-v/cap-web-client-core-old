import {injectable, inject, Container, ContainerModule} from 'inversify'
import axios, {AxiosStatic} from 'axios'

export class Packages {
    public static get inversify() {
        return {injectable, inject, Container, ContainerModule}
    }

    public static get  axios(): {axios: AxiosStatic} {
        return {axios}
    }
}