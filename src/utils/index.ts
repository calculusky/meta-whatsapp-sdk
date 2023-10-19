import { ConfigOptions, WhatsAppOptions } from "../types/config";
import * as Config from "../config";

export const buildConfig = (options: WhatsAppOptions): ConfigOptions => {
    const config: ConfigOptions = {
        accessToken: options.accessToken,
        apiVersion: Config.API_VERSION,
        baseUrl: Config.BASE_URL,
        phoneNumberId: options.phoneNumberId,
    };
    return config;
};
