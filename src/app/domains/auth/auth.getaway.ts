import {Getaway} from "../../../core/decorators/schema.decorators";
import {AuthSymbols} from "./auth.symbols";
import {NAuth} from "../../../../types/schema/domain/auth";
import {NSchemaLoader} from "@Core/Types";

@Getaway<NAuth.Getaway>(AuthSymbols.Getaway,{
    "v1/signup": async (body, query, headers): Promise<NSchemaLoader.Route> => {
        return {
            method: 'POST',
            body: body ?? null,
            query: query ?? null,
            headers: headers ?? null
        }
    },
    "v1/login": async (body, query, headers): Promise<NSchemaLoader.Route> => {
        return {
            method: 'POST',
            body: body ?? null,
            query: query ?? null,
            headers: headers ?? null
        }
    },
    "v1/logout": async (_, query, headers): Promise<NSchemaLoader.Route> => {
        return {
            method: 'GET',
            body: null,
            query: query ?? null,
            headers: headers ?? null
        }
    }
})
export class AuthGetaway {}