## Meta WhatsApp Business SDK for Cloud API

<p align="center">
<img src="./static/img/logo.svg" width="150" alt="WhatsApp Logo" />
</p>

The SDK is a light weight package with zero dependency written in TypeScript to simplify access to the meta whatsApp cloud API, [Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/).
The SDK currently supports most features for the messaging API such as template, text, image, video, document etc.

## Installation

```shell
pnpm install @calculusky/meta-whatsapp-sdk
#or
npm install @calculusky/meta-whatsapp-sdk
#or
yarn add @calculusky/meta-whatsapp-sdk
```

## Usage

First, obtain your credentials such as the Access Token and Phone number ID from the Meta Developer Platform

#### Examples

**CommonJS Usage**

Note: In order to gain the TypeScript typings (for intellisense / autocomplete) while using CommonJS, use require().default as seen below:

```js
const WhatsApp = require("@calculusky/meta-whatsapp-sdk").default;

const whatsApp = new WhatsApp({
  accessToken: ACCESS_TOKEN
  phoneNumberId: PHONE_NUMBER_ID,
});



```

**TypeScript Usage**

```ts
import WhatsApp from "@calculusky/meta-whatsapp-sdk";

//ES6
whatsApp.message
    .template({
        recipient: "2347035549057",
        body: {
            language: {
                code: "en_US",
            },
            name: "hello_world",
        },
    })
    .then((resData) => {
        console.log(resData);
    })
    .catch((error) => {
        console.log(error);
    });

//ES8
try {
    await whatsApp.message.template({
        recipient: "2347035549057",
        body: {
            language: {
                code: "en_US",
            },
            name: "hello_world",
        },
    });
} catch (error) {
    console.log(error);
}
```
