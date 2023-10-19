import { RequestData } from "../types/httpsClient";
import { HttpMethod, RequesterResponseData } from "../types/requester";
import { BaseAPI } from "./base";

import * as m from "../types/message";

export default class MessageAPI extends BaseAPI implements m.IMessageAPI {
    private readonly commonMethod: HttpMethod = "POST";
    private readonly commonEndpoint = "messages";

    private bodyBuilder<
        TMessageType extends m.MessageTypesEnum,
        TComponentType extends m.ComponentTypes
    >(
        options: m.BodyBuilderOptions<TMessageType, TComponentType>
    ): m.MessageRequestBody<TMessageType> {
        const body: m.MessageRequestBody<TMessageType> = {
            messaging_product: "whatsapp",
            to: options.toNumber,
            recipient_type: "individual",
            type: options.type,
            [options.type]: options.payload,
        } as any;

        if (options.replyMessageId) {
            body.context = { message_id: options.replyMessageId };
        }
        return body;
    }

    private async send(
        requestData: RequestData
    ): Promise<RequesterResponseData<m.MessagesResponse>> {
        return await this.client.sendAPIRequest({
            method: this.commonMethod,
            endpoint: this.commonEndpoint,
            body: JSON.stringify(requestData),
        });
    }

    async template(
        options: m.SendMessageOptions<
            m.MessageTypesEnum.Template,
            m.ComponentTypes
        >
    ) {
        const body = this.bodyBuilder({
            type: m.MessageTypesEnum.Template,
            payload: options.body,
            toNumber: options.recipient,
            replyMessageId: options.replyMessageId,
        });

        return await this.send(body);
    }

    async text(options: m.SendMessageOptions<m.MessageTypesEnum.Text>) {
        const body = this.bodyBuilder({
            type: m.MessageTypesEnum.Text,
            payload: options.body,
            toNumber: options.recipient,
            replyMessageId: options.replyMessageId,
        });

        return await this.send(body);
    }

    async image(options: m.SendMessageOptions<m.MessageTypesEnum.Image>) {
        const body = this.bodyBuilder({
            type: m.MessageTypesEnum.Image,
            payload: options.body,
            toNumber: options.recipient,
            replyMessageId: options.replyMessageId,
        });

        return await this.send(body);
    }

    async video(options: m.SendMessageOptions<m.MessageTypesEnum.Video>) {
        const body = this.bodyBuilder({
            type: m.MessageTypesEnum.Video,
            payload: options.body,
            toNumber: options.recipient,
            replyMessageId: options.replyMessageId,
        });

        return await this.send(body);
    }

    async audio(options: m.SendMessageOptions<m.MessageTypesEnum.Audio>) {
        const body = this.bodyBuilder({
            type: m.MessageTypesEnum.Video,
            payload: options.body,
            toNumber: options.recipient,
            replyMessageId: options.replyMessageId,
        });

        return await this.send(body);
    }

    async document(options: m.SendMessageOptions<m.MessageTypesEnum.Document>) {
        const body = this.bodyBuilder({
            type: m.MessageTypesEnum.Document,
            payload: options.body,
            toNumber: options.recipient,
            replyMessageId: options.replyMessageId,
        });

        return await this.send(body);
    }

    async sticker(options: m.SendMessageOptions<m.MessageTypesEnum.Sticker>) {
        const body = this.bodyBuilder({
            type: m.MessageTypesEnum.Sticker,
            payload: options.body,
            toNumber: options.recipient,
            replyMessageId: options.replyMessageId,
        });

        return await this.send(body);
    }

    async reaction(options: m.SendMessageOptions<m.MessageTypesEnum.Reaction>) {
        const body = this.bodyBuilder({
            type: m.MessageTypesEnum.Reaction,
            payload: options.body,
            toNumber: options.recipient,
            replyMessageId: options.replyMessageId,
        });

        return await this.send(body);
    }
}
