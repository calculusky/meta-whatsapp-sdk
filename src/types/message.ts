import { RequesterResponseData } from "./requester";

export const enum MessageTypesEnum {
    Template = "template", // for template messages. Text and media (images and documents) message templates are supported.
    Text = "text", // for text messages.
    Image = "image", // for image messages.
    Document = "document", // for document messages.
    Video = "video", // for video messages
    Audio = "audio", // for audio messages.
    Sticker = "sticker", // for sticker messages.
    Reaction = "reaction", // for reaction messages.
}

export type ComponentTypes = "header" | "body" | "button";

export type GeneralMessageBody = {
    /**
     * The Meta messaging product name.
     * @default 'whatsapp'
     */
    messaging_product: "whatsapp";
};

export type ParametersTypes =
    | "currency"
    | "date_time"
    | "document"
    | "image"
    | "text"
    | "video"
    | "payload";

type ParametersObject<T extends ParametersTypes> = {
    type: T;
};

type ConTextObject = {
    message_id: string;
};

export type MessageRequestBody<T extends MessageTypesEnum> =
    GeneralMessageBody & {
        recipient_type?: "individual";
        to: string;
        context?: ConTextObject;
        type: T;
    } & {
        [K in T]: T extends keyof MessageObjectMap<ComponentTypes>
            ? MessageObjectMap<ComponentTypes>[T]
            : never;
    };

export type MessagesResponse = GeneralMessageBody & {
    contacts: [
        {
            input: string;
            wa_id: string;
        }
    ];
    messages: [
        {
            id: string;
            message_status: string;
        }
    ];
};

//parameter objects
type SimpleTextObject = {
    text: string;
};

type TextParametersObject = ParametersObject<"text"> & SimpleTextObject;

type CurrencyObject = {
    fallback_value: string;
    code: CurrencyCodes;
    amount_1000: number;
};

type CurrencyParametersObject = ParametersObject<"currency"> & {
    currency: CurrencyObject;
};

type DateTimeObject = {
    fallback_value: string;
};

type DateTimeParametersObject = ParametersObject<"date_time"> & {
    date_time: DateTimeObject;
};

type MetaDocumentMediaObject = {
    id: string;
    link?: never;
    caption?: string;
    filename?: string;
};
type HostedDocumentMediaObject = {
    id?: never;
    link: string;
    caption?: string;
    filename?: string;
};

type DocumentParametersObject = ParametersObject<"document"> &
    DocumentMediaObject;

type MetaImageMediaObject = {
    id: string;
    link?: never;
    caption?: string;
};

type HostedImageMediaObject = {
    id?: never;
    link: string;
    caption?: string;
};

type ImageParametersObject = ParametersObject<"image"> & ImageMediaObject;

type MetaHostedVideoMediaObject = {
    id: string;
    link?: never;
    caption?: string;
};

type SelfHostedVideoMediaObject = {
    id?: never;
    link: string;
    caption?: string;
};

type MetaAudioMediaObject = {
    id: string;
    link?: never;
};

type HostedAudioMediaObject = {
    id?: never;
    link: string;
};

type VideoParametersObject = ParametersObject<"video"> & VideoMediaObject;

type QuickReplyButtonParametersObject = {
    type: "payload";
    payload: string;
};

type URLButtonParametersObject = SimpleTextObject & {
    type: "text";
};

type ButtonParameterObject =
    | QuickReplyButtonParametersObject
    | URLButtonParametersObject;

type ComponentObject<T extends ComponentTypes> = {
    type: T;
    parameters: (
        | CurrencyParametersObject
        | DateTimeParametersObject
        | DocumentParametersObject
        | ImageParametersObject
        | TextParametersObject
        | VideoParametersObject
    )[];
};

type ButtonComponentObject = ComponentObject<"button"> & {
    parameters: ButtonParameterObject;
    sub_type: ButtonTypesEnum;
    index: ButtonPositionEnum;
};

//message template
export type MessageTemplateObject<T extends ComponentTypes> = {
    name: string;
    language: LanguageObject;
    components?: (ComponentObject<T> | ButtonComponentObject)[];
};

export type MessageTemplateRequestBody<T extends ComponentTypes> =
    MessageRequestBody<MessageTypesEnum.Template> & MessageTemplateObject<T>;

//image
export type ImageMediaObject = MetaImageMediaObject | HostedImageMediaObject;

//text
export type TextObject = {
    body: string;
    preview_url?: boolean;
};

//document
export type DocumentMediaObject =
    | MetaDocumentMediaObject
    | HostedDocumentMediaObject;

//video
export type VideoMediaObject =
    | MetaHostedVideoMediaObject
    | SelfHostedVideoMediaObject;

//audio
export type AudioMediaObject = MetaAudioMediaObject | HostedAudioMediaObject;

//sticker
type MetaStickerMediaObject = {
    id: string;
    link?: never;
};

//reaction
type ReactionObject = {
    message_id: string;
    emoji: string;
};

type HostedStickerMediaObject = {
    id?: never;
    link: string;
};

export type StickerMediaObject =
    | MetaStickerMediaObject
    | HostedStickerMediaObject;

type LanguageObject = {
    policy?: "deterministic";
    code: Language;
};

type CurrencyCodes = "EUR" | "USD" | "NGN";

type Language = "en" | "en_GB" | "en_US";

export const enum ButtonTypesEnum {
    QuickReply = "quick_reply",
    URL = "url",
}

export const enum ButtonPositionEnum {
    First,
    Second,
    Third,
}

export interface BodyBuilderOptions<
    TMessageType extends MessageTypesEnum,
    TComponentType extends ComponentTypes
> {
    type: TMessageType;
    toNumber: string;
    replyMessageId?: string;
    payload: TMessageType extends keyof MessageObjectMap<TComponentType>
        ? MessageObjectMap<TComponentType>[TMessageType]
        : never;
}

type MessageObjectMap<TComponentType extends ComponentTypes> = {
    [MessageTypesEnum.Audio]: AudioMediaObject;
    [MessageTypesEnum.Document]: DocumentMediaObject;
    [MessageTypesEnum.Image]: ImageMediaObject;
    [MessageTypesEnum.Template]: MessageTemplateObject<TComponentType>;
    [MessageTypesEnum.Text]: TextObject;
    [MessageTypesEnum.Video]: VideoMediaObject;
    [MessageTypesEnum.Sticker]: StickerMediaObject;
    [MessageTypesEnum.Reaction]: ReactionObject;
};

export interface SendMessageOptions<
    TMessageType extends MessageTypesEnum,
    TComponentType extends ComponentTypes = ComponentTypes
> {
    recipient: string;
    replyMessageId?: string;
    body: TMessageType extends keyof MessageObjectMap<TComponentType>
        ? MessageObjectMap<TComponentType>[TMessageType]
        : never;
}

export interface IMessageAPI {
    template(
        options: SendMessageOptions<MessageTypesEnum.Template>
    ): Promise<RequesterResponseData<MessagesResponse>>;

    text(
        options: SendMessageOptions<MessageTypesEnum.Text>
    ): Promise<RequesterResponseData<MessagesResponse>>;

    image(
        options: SendMessageOptions<MessageTypesEnum.Image>
    ): Promise<RequesterResponseData<MessagesResponse>>;

    video(
        options: SendMessageOptions<MessageTypesEnum.Video>
    ): Promise<RequesterResponseData<MessagesResponse>>;

    audio(
        options: SendMessageOptions<MessageTypesEnum.Audio>
    ): Promise<RequesterResponseData<MessagesResponse>>;

    document(
        options: SendMessageOptions<MessageTypesEnum.Document>
    ): Promise<RequesterResponseData<MessagesResponse>>;

    sticker(
        options: SendMessageOptions<MessageTypesEnum.Sticker>
    ): Promise<RequesterResponseData<MessagesResponse>>;

    reaction(
        options: SendMessageOptions<MessageTypesEnum.Reaction>
    ): Promise<RequesterResponseData<MessagesResponse>>;
}
