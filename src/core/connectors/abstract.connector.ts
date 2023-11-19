import {Packages} from "@Packages";
import {IAbstractConnector} from "@Core/Types";

const {injectable} = Packages.inversify


@injectable()
export abstract class AbstractConnector implements IAbstractConnector {
    public abstract async start(): Promise<void>

    public abstract async stop(): Promise<void>
}