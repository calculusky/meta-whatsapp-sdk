import { request } from "https";
import {
    HttpsClientOptions,
    IHttpsClient,
    IHttpsClientResponse,
    SendRequestOptions,
} from "./types/httpsClient";
import { IncomingMessage, IncomingHttpHeaders } from "http";
import { WhatsAppError } from "./errors";

export default class HttpsClient implements IHttpsClient {
    constructor(protected clientOptions: HttpsClientOptions) {}

    sendRequest<TData>(
        options: SendRequestOptions
    ): Promise<IHttpsClientResponse<TData>> {
        return new Promise((resolve, reject) => {
            const req = request({
                hostname: this.clientOptions.baseURL,
                method: options.method,
                path: options.path,
                headers: this.clientOptions.headers,
            });

            req.on("response", (response: IncomingMessage) => {
                resolve(new HttpsClientResponse(response));
            });
            req.on("error", (error) => {
                reject(error);
            });
            req.write(options.requestData);
            req.end();
        });
    }
}

class HttpsClientResponse implements IHttpsClientResponse {
    status: number;
    headers: IncomingHttpHeaders;
    data: any;
    error: WhatsAppError | undefined;
    constructor(private response: IncomingMessage) {
        this.status = response.statusCode;
        this.headers = response.headers;
        this.jsonResponse();
    }

    private jsonResponse() {
        let resp = "";
        this.response.setEncoding("utf8");
        this.response.on("data", (chunk) => {
            resp += chunk.toString();
        });

        this.response.on("error", (error) => {
            const err = new WhatsAppError(
                error.message ?? "Something went wrong"
            );
            err.status = 500;
            err.stack = error.stack;
            this.error = err;
        });
        this.response.on("end", () => {
            try {
                const respObj = JSON.parse(resp);

                if (this.status >= 400) {
                    const err = new WhatsAppError(
                        respObj?.error?.message ?? "Something went wrong"
                    );
                    err.status = this.status;
                    err.code = respObj?.error?.code;
                    this.error = err;
                } else {
                    this.data = respObj;
                }
            } catch (error) {
                const err = new WhatsAppError(
                    error.message ?? "Something went wrong"
                );
                err.status = 500;
                err.stack = error.stack;
                this.error = err;
            }
        });
    }
}
