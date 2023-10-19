export interface WhatsAppOptions {
    accessToken: string;
    phoneNumberId: number;
}

export interface ConfigOptions extends WhatsAppOptions {
    baseUrl: string;
    apiVersion: string;
}
