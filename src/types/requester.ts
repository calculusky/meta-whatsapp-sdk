export type HttpMethod = "POST" | "GET" | "PUT";

export interface SendRequestOptions {
    method: HttpMethod;
    body: any;
    endpoint: string;
}

export type RequesterResponseData<TData> = TData;
