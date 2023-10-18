import MessageAPI from "./api/message";
import { Requester } from "./requester";
import { ConfigOptions, WhatsappOptions } from "./types/config";
import * as Utils from "./utils";

export default class WhatsApp {
  private config: ConfigOptions;
  private requester: Requester;

  readonly message: MessageAPI;

  constructor(protected whatsAppOptions: WhatsappOptions) {
    this.config = Utils.buildConfig({
      accessToken: whatsAppOptions.accessToken,
      phoneNumberId: whatsAppOptions.phoneNumberId,
    });
    this.requester = new Requester(this.config);
    this.message = new MessageAPI(this.requester);
  }

  updateAccessToken(accessToken: string): boolean {
    this.requester.updateAccessToken(accessToken);
    return true;
  }

  updateSenderNumberId(phoneNumberId: number): boolean {
    this.requester.updatePhoneNumberId(phoneNumberId);
    return true;
  }
}
