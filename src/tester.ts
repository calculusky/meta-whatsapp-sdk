import WhatsApp from ".";

const wa = new WhatsApp({
    accessToken:
        "EAAP4sHK7d90BO6usTA0Rykk2WzFPRWZAUKSiw7dPWYI8kUbATFlIKk5KsgKFabu8Dfy6AeP8I05Vjnqqoht2Mh2KxIQEzvpNQ99sbhCRFQd6nYJIZArM1hte2K3DyEZBuZCRdfJzE0FBIdsl1Hx7SBbtFRxOI4fPrvxYHrRzciJZBqcFasJAqWsvmZCusAF4t8g7RehnBp2WrLDCVt",
    phoneNumberId: 108081682397910,
});

async function runner() {
    try {
        const response = await wa.message.template({
            recipient: "2347030829057",
            body: {
                language: {
                    code: "en",
                },
                name: "buyer_initiate_order_request",
                components: [
                    {
                        type: "header",
                        // parameters: [
                        //     {
                        //         type: "text",
                        //         text: "Nedus",
                        //     },
                        // ],
                        parameters: {
                            type: "text",
                            text: "Nedus",
                        } as any,
                    },
                    {
                        type: "button",
                        sub_type: "url",
                        index: 0,
                        // parameters: [
                        //     {
                        //         type: "text",
                        //         text: "https://www.feegor.app/marketplace/account/order-request-sent?orderRequestId=45&requestStatus=PENDING",
                        //     },
                        // ],
                        parameters: {
                            type: "text",
                            text: "https://www.feegor.app/marketplace/account/order-request-sent?orderRequestId=45&requestStatus=PENDING",
                        } as any,
                    },
                ],
            },
        });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

runner();
