import MessageAPI from "./api/message";
import { Requester } from "./requester";
import { ConfigOptions, WhatsAppOptions } from "./types/config";
import * as Utils from "./utils";
export * from "./errors";
export * as IMessageAPI from "./types/message";

export default class WhatsApp {
    private config: ConfigOptions;
    private requester: Requester;

    readonly message: MessageAPI;

    constructor(protected whatsAppOptions: WhatsAppOptions) {
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
