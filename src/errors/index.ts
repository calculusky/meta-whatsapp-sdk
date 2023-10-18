export class WhatsappError extends Error {
    name = "WhatsappError";
    status: number;
    code: number;
    type: string;
}
