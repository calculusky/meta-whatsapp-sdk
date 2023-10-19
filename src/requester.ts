import { ConfigOptions } from "./types/config";
import { SendRequestOptions } from "./types/requester";

import HttpsClient from "./httpsClient";
import { HttpsClientOptions, IHttpsClientResponse } from "./types/httpsClient";
import { WhatsAppError } from "./errors";

export class Requester {
    private client: HttpsClient;
    constructor(private options: ConfigOptions) {
        const config = this.buildConfig();
        this.client = new HttpsClient(config);
    }

    private buildConfig() {
        const clientOptions: HttpsClientOptions = {
            baseURL: this.options.baseUrl,
            headers: {
                Authorization: `Bearer ${this.options.accessToken}`,
                "Content-Type": "application/json",
            },
        };
        return clientOptions;
    }

    updateAccessToken(token: string) {
        this.options.accessToken = token;
        const config = this.buildConfig();
        this.client = new HttpsClient(config);
    }

    updatePhoneNumberId(phoneNumberId: number) {
        this.options.phoneNumberId = phoneNumberId;
    }

    private buildPath(endpoint: string) {
        return `/${this.options.apiVersion}/${this.options.phoneNumberId}/${endpoint}`;
    }

    async sendAPIRequest<TData>(
        options: SendRequestOptions
    ): Promise<IHttpsClientResponse<TData>> {
        try {
            const resp = await this.client.sendRequest({
                method: options.method,
                path: this.buildPath(options.endpoint),
                requestData: options.body,
            });

            if (resp.error) {
                throw resp.error;
            }
            return resp as IHttpsClientResponse<TData>;
        } catch (error) {
            switch (true) {
                case error instanceof WhatsAppError: {
                    throw error;
                }

                default: {
                    const err = new WhatsAppError(
                        error.message ?? "Something went wrong"
                    );
                    err.stack = error.stack;
                    err.status = 500;
                    throw err;
                }
            }
        }
    }
}
