import { WhatsAppError } from "../errors";
import { IncomingHttpHeaders } from "http";
import { HttpMethod } from "./requester";

type RequestHeaders = {
    Authorization: string;
    "Content-Type"?: string;
};

export type SendRequestOptions = {
    path: string;
    method: HttpMethod;
    requestData?: any;
};

export interface HttpsClientOptions {
    headers: RequestHeaders;
    baseURL: string;
}

export type IHttpsClientResponse<D = Record<string, any>> = {
    status: number;
    headers: IncomingHttpHeaders;
    error: WhatsAppError | undefined;
    data: D;
};

export type RequestData = Record<string, unknown> | string;

export interface IHttpsClient {
    sendRequest(options: SendRequestOptions): Promise<IHttpsClientResponse>;
}
