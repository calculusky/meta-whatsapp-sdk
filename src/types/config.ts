export interface WhatsappOptions {
  accessToken: string;
  phoneNumberId: number;
}

export interface ConfigOptions extends WhatsappOptions {
  baseUrl: string;
  apiVersion: string;
  // businessId: string;
  // whatsappBusinessAccountId: string;
}
