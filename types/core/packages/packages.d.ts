import inversify from 'inversify'
import axios from 'axios'
import {UnknownObject} from "../utility";

export namespace Inversify {
    export namespace interfaces {
        export type Bind = inversify.interfaces.Bind;
    }
}

export namespace Axios {
    export type AxiosInstance = axios.AxiosInstance
    export type AxiosRequestConfig<D extends UnknownObject> = axios.AxiosRequestConfig<D>
}