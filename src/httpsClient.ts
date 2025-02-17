import { request } from "https";
import {
    HttpsClientOptions,
    IHttpsClient,
    IHttpsClientResponse,
    SendRequestOptions,
} from "./types/httpsClient";
import { WhatsAppError } from "./errors";
import { HttpMethod } from "./types/requester";

export default class HttpsClient implements IHttpsClient {
    constructor(protected clientOptions: HttpsClientOptions) {}

    sendRequest<TData>(
        options: SendRequestOptions
    ): Promise<IHttpsClientResponse<TData>> {
        return new Promise((resolve, reject) => {
            const req = request(
                {
                    hostname: this.clientOptions.baseURL,
                    method: options.method,
                    path: options.path,
                    headers: this.clientOptions.headers,
                },
                (res) => {
                    const clientResponse = new HttpsClientResponse();
                    clientResponse.status = res.statusCode;
                    let resp = "";

                    res.on("error", (error) => {
                        const err = new WhatsAppError(
                            error.message ?? "Something went wrong"
                        );
                        err.status = 500;
                        err.stack = error.stack;
                        reject(err);
                    });

                    res.on("data", (chunk) => {
                        resp += chunk.toString();
                    });
                    res.on("end", () => {
                        try {
                            const respObj = JSON.parse(resp);

                            if (clientResponse.status >= 400) {
                                const err = new WhatsAppError(
                                    respObj?.error?.message ??
                                        "Something went wrong"
                                );
                                err.status = clientResponse.status;
                                err.code = respObj?.error?.code;
                                reject(err);
                            } else {
                                clientResponse.data = respObj;
                                resolve(clientResponse);
                            }
                        } catch (error) {
                            const err = new WhatsAppError(
                                error.message ?? "Something went wrong"
                            );
                            err.status = 500;
                            err.stack = error.stack;
                            reject(err);
                        }
                    });
                }
            );

            const postDataMethods: HttpMethod[] = ["POST", "PUT"];

            req.on("error", (error) => {
                reject(error);
            });

            if (postDataMethods.includes(options.method)) {
                req.write(options.requestData);
            }

            req.end();
        });
    }
}

class HttpsClientResponse implements IHttpsClientResponse {
    status: number;
    data: any;
}
