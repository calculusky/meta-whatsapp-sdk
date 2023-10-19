import { Requester } from "../src/requester";
import * as Config from "../src/config";

describe("Send Request", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const testAccessToken = "hgkgfgcgcgvhbhbhbujhjkjk";
    const testPhoneNumberId = 65657785656577;
    const baseUrl = Config.BASE_URL;
    const version = Config.API_VERSION;
    const recipient = "2347045629057";
    const defaultRequestBody = JSON.stringify({
        recipient: recipient,
        body: {
            language: {
                code: "en_US",
            },
            name: "hello_world",
        },
    });
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

    const requester = new Requester({
        accessToken: testAccessToken,
        apiVersion: version,
        baseUrl: baseUrl,
        phoneNumberId: testPhoneNumberId,
    });

    const sendRequestOption: any = {
        body: defaultRequestBody,
        endpoint: "messages",
        method: "POST",
    };

    it("Should pass if all credentials are correct", async () => {
        const sendRequestMock = jest
            .spyOn(requester, "sendAPIRequest")
            .mockReturnValue(defaultMessagesResponse);
        await requester.sendAPIRequest(sendRequestOption);
        expect(sendRequestMock).toHaveBeenCalledTimes(1);
        expect(sendRequestMock).toHaveBeenCalledWith(sendRequestOption);
    });
});
