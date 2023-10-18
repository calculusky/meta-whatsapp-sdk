import { ConfigOptions, WhatsappOptions } from "@/types/config";

const BASE_URL = "graph.facebook.com";
const API_VERSION = "v17.0";

export const buildConfig = (options: WhatsappOptions): ConfigOptions => {
  const config: ConfigOptions = {
    accessToken: options.accessToken,
    apiVersion: API_VERSION,
    baseUrl: BASE_URL,
    phoneNumberId: options.phoneNumberId,
  };
  return config;
};
