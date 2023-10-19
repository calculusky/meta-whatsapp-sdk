import WhatsApp, { WhatsAppError } from "../src";

describe("Send WhatsApp Messages", () => {
    const testAccessToken = "hgkgfgcgcgvhbhbhbujhjkjk";
    const testPhoneNumberId = 65657785656577;
    const recipient = "2347045629057";
    const defaultMessagesResponse: any = {
        messaging_product: "whatsapp",
        contacts: [{ input: "2347045629057", wa_id: "2347045629057" }],
        messages: [
            {
                id: "wamid.HBgNMjM0NzAzMDgyOTA1NxUCABEYEjVDMkUzMUJDNzIzRDAxNzgwNAA=",
                message_status: "accepted",
            },
        ],
    };

    const whatsApp = new WhatsApp({
        accessToken: testAccessToken,
        phoneNumberId: testPhoneNumberId,
    });

    describe("Send Template Message", () => {
        afterEach(jest.clearAllMocks);

        it("Should pass if template name is valid and other parameters are correct", async () => {
            const sendTemplateMessageMock = jest
                .spyOn(whatsApp.message, "template")
                .mockReturnValue(Promise.resolve(defaultMessagesResponse));
            const templateOptions: any = {
                recipient: recipient,
                body: {
                    language: {
                        code: "en_US",
                    },
                    name: "hello_world",
                },
            };

            await whatsApp.message.template(templateOptions);
            expect(sendTemplateMessageMock).toHaveBeenCalledTimes(1);
            expect(sendTemplateMessageMock).toHaveBeenCalledWith(
                templateOptions
            );
        });

        it("Should fail if the wrong template name is selected", async () => {
            const errMessage =
                "Template name does not exist in the translation";
            const sendTemplateMessageMock = jest
                .spyOn(whatsApp.message, "template")
                .mockImplementation(async () => {
                    throw new WhatsAppError(errMessage);
                });
            const templateOptions: any = {
                recipient: recipient,
                body: {
                    language: {
                        code: "en_US",
                    },
                    name: "invalid_template",
                },
            };
            try {
                await whatsApp.message.template(templateOptions);
            } catch (error) {
                expect(error.message).toEqual(errMessage);
            }
            expect(sendTemplateMessageMock).toHaveBeenCalledTimes(1);
            expect(sendTemplateMessageMock).toHaveBeenCalledWith(
                templateOptions
            );
        });
    });
});
