export class WhatsAppError extends Error {
    name = "WhatsAppError";
    status: number;
    code: number;
    type: string;
}
