import { createLogger } from "winston";
import axios, { AxiosError } from "axios";

jest.mock("axios");
axios.create.mockReturnValue({
    post: jest.fn(() => Promise.resolve({ data: {} }))
});

import SlackHook from "../slackHook";

describe("Standard options", () => {
    const fakeOpts = {
        name: "totally-fake-slackhook",
        formatter: "totally-fake-formatter",
        webhookUrl: "https://totally.fake.url",
        channel: "#totally-fake-channel",
        username: "totally-fake-username",
        iconEmoji: ":totally-fake-emoji:",
        iconUrl: "https://totally.fake.icon.url",
        unfurlLinks: true,
        unfurlMedia: true,
        mrkdwn: true
    };

    let fakeSlackHook;

    beforeAll(() => {
        jest.clearAllMocks();
        fakeSlackHook = new SlackHook(fakeOpts);
    });

    beforeEach(() => {
        jest.resetModules();
    });

    test("checks if parameters are correct", async () => {
        expect(fakeSlackHook).toBeInstanceOf(SlackHook);
        expect(fakeSlackHook.name).toEqual(fakeOpts.name);
        expect(fakeSlackHook.formatter).toEqual(fakeOpts.formatter);
        expect(fakeSlackHook.webhookUrl).toEqual(fakeOpts.webhookUrl);
        expect(fakeSlackHook.unfurlLinks).toEqual(fakeOpts.unfurlLinks);
        expect(fakeSlackHook.unfurlMedia).toEqual(fakeOpts.unfurlMedia);
        expect(fakeSlackHook.mrkdwn).toEqual(fakeOpts.mrkdwn);
        expect(fakeSlackHook.channel).toEqual(fakeOpts.channel);
        expect(fakeSlackHook.username).toEqual(fakeOpts.username);
        expect(fakeSlackHook.iconEmoji).toEqual(fakeOpts.iconEmoji);
        expect(fakeSlackHook.iconUrl).toEqual(fakeOpts.iconUrl);
        expect(axios.create).toHaveBeenCalledTimes(1);
    });

    test("log function gets called with correct params", async () => {
        const fakeCb = jest.fn();
        const fakePayload = {
            unfurl_links: fakeOpts.unfurlLinks,
            unfurl_media: fakeOpts.unfurlMedia,
            channel: fakeOpts.channel,
            username: fakeOpts.username,
            icon_emoji: fakeOpts.iconEmoji,
            icon_url: fakeOpts.iconUrl,
            mrkdwn: fakeOpts.mrkdwn,
            text: "undefined: undefined"
        };

        await fakeSlackHook.log({}, fakeCb);

        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledTimes(1);
        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledWith(
            fakeOpts.webhookUrl,
            fakePayload
        );

        expect(fakeCb).toHaveBeenCalledTimes(1);
    });
});

describe("Standard options with custom formatter", () => {
    const fakeFormatter = jest.fn((info) => ({
        text: `Custom message: ${info.message}`
    }));
    const fakeOpts = {
        name: "totally-fake-slackhook",
        formatter: fakeFormatter,
        webhookUrl: "https://totally.fake.url",
        channel: "#totally-fake-channel",
        username: "totally-fake-username",
        iconEmoji: ":totally-fake-emoji:",
        iconUrl: "https://totally.fake.icon.url",
        unfurlLinks: true,
        unfurlMedia: true,
        mrkdwn: true
    };

    let fakeSlackHook;

    beforeAll(() => {
        jest.clearAllMocks();
        fakeSlackHook = new SlackHook(fakeOpts);
    });

    beforeEach(() => {
        jest.resetModules();
    });

    test("checks if parameters are correct", async () => {
        expect(fakeSlackHook).toBeInstanceOf(SlackHook);
        expect(fakeSlackHook.name).toEqual(fakeOpts.name);
        expect(fakeSlackHook.formatter).toEqual(fakeOpts.formatter);
        expect(fakeSlackHook.webhookUrl).toEqual(fakeOpts.webhookUrl);
        expect(fakeSlackHook.unfurlLinks).toEqual(fakeOpts.unfurlLinks);
        expect(fakeSlackHook.unfurlMedia).toEqual(fakeOpts.unfurlMedia);
        expect(fakeSlackHook.mrkdwn).toEqual(fakeOpts.mrkdwn);
        expect(fakeSlackHook.channel).toEqual(fakeOpts.channel);
        expect(fakeSlackHook.username).toEqual(fakeOpts.username);
        expect(fakeSlackHook.iconEmoji).toEqual(fakeOpts.iconEmoji);
        expect(fakeSlackHook.iconUrl).toEqual(fakeOpts.iconUrl);
        expect(axios.create).toHaveBeenCalledTimes(1);
    });

    test("log function gets called with correct params", async () => {
        const fakeCb = jest.fn();
        const fakePayload = {
            attachments: undefined,
            unfurl_links: fakeOpts.unfurlLinks,
            unfurl_media: fakeOpts.unfurlMedia,
            mrkdwn: fakeOpts.mrkdwn,
            channel: fakeOpts.channel,
            username: fakeOpts.username,
            icon_emoji: fakeOpts.iconEmoji,
            icon_url: fakeOpts.iconUrl,
            text: "Custom message: undefined"
        };

        await fakeSlackHook.log({}, fakeCb);

        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledTimes(1);
        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledWith(
            fakeOpts.webhookUrl,
            fakePayload
        );

        expect(fakeFormatter).toHaveBeenCalledTimes(1);

        expect(fakeCb).toHaveBeenCalledTimes(1);
    });
});

describe("Custom options with custom formatter", () => {
    const fakeFormatter = jest.fn((info) => ({
        text: `Custom message: ${info.message}`,
        icon_url: "a",
        username: "b",
        icon_emoji: "c",
        channel: "d"
    }));
    const fakeOpts = {
        name: "totally-fake-slackhook",
        formatter: fakeFormatter,
        webhookUrl: "https://totally.fake.url",
        channel: "#totally-fake-channel",
        username: "totally-fake-username",
        iconEmoji: ":totally-fake-emoji:",
        iconUrl: "https://totally.fake.icon.url",
        unfurlLinks: true,
        unfurlMedia: true,
        mrkdwn: true
    };

    let fakeSlackHook;

    beforeAll(() => {
        jest.clearAllMocks();
        fakeSlackHook = new SlackHook(fakeOpts);
    });

    beforeEach(() => {
        jest.resetModules();
    });

    test("log function gets called with correct params", async () => {
        const fakeCb = jest.fn();
        const fakePayload = {
            attachments: undefined,
            unfurl_links: fakeOpts.unfurlLinks,
            unfurl_media: fakeOpts.unfurlMedia,
            mrkdwn: fakeOpts.mrkdwn,
            text: "Custom message: undefined",
            icon_url: "a",
            username: "b",
            icon_emoji: "c",
            channel: "d"
        };

        await fakeSlackHook.log({}, fakeCb);

        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledTimes(1);
        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledWith(
            fakeOpts.webhookUrl,
            fakePayload
        );

        expect(fakeFormatter).toHaveBeenCalledTimes(1);

        expect(fakeCb).toHaveBeenCalledTimes(1);
    });
});

describe("Standard options with formatter that filters out all messages", () => {
    const fakeFormatter = jest.fn((info) => false);
    const fakeOpts = {
        name: "totally-fake-slackhook",
        formatter: fakeFormatter,
        webhookUrl: "https://totally.fake.url",
        channel: "#totally-fake-channel",
        username: "totally-fake-username",
        iconEmoji: ":totally-fake-emoji:",
        iconUrl: "https://totally.fake.icon.url",
        unfurlLinks: true,
        unfurlMedia: true,
        mrkdwn: true
    };

    let fakeSlackHook;

    beforeAll(() => {
        jest.clearAllMocks();
        fakeSlackHook = new SlackHook(fakeOpts);
    });

    beforeEach(() => {
        jest.resetModules();
    });

    test("checks if parameters are correct", async () => {
        expect(fakeSlackHook).toBeInstanceOf(SlackHook);
        expect(fakeSlackHook.name).toEqual(fakeOpts.name);
        expect(fakeSlackHook.formatter).toEqual(fakeOpts.formatter);
        expect(fakeSlackHook.webhookUrl).toEqual(fakeOpts.webhookUrl);
        expect(fakeSlackHook.unfurlLinks).toEqual(fakeOpts.unfurlLinks);
        expect(fakeSlackHook.unfurlMedia).toEqual(fakeOpts.unfurlMedia);
        expect(fakeSlackHook.mrkdwn).toEqual(fakeOpts.mrkdwn);
        expect(fakeSlackHook.channel).toEqual(fakeOpts.channel);
        expect(fakeSlackHook.username).toEqual(fakeOpts.username);
        expect(fakeSlackHook.iconEmoji).toEqual(fakeOpts.iconEmoji);
        expect(fakeSlackHook.iconUrl).toEqual(fakeOpts.iconUrl);
        expect(axios.create).toHaveBeenCalledTimes(1);
    });

    test("log function gets called with correct params", async () => {
        const fakeCb = jest.fn();
        const fakePayload = {
            unfurl_links: fakeOpts.unfurlLinks,
            unfurl_media: fakeOpts.unfurlMedia,
            channel: fakeOpts.channel,
            username: fakeOpts.username,
            icon_emoji: fakeOpts.iconEmoji,
            icon_url: fakeOpts.iconUrl,
            mrkdwn: fakeOpts.mrkdwn,
            text: "undefined: undefined"
        };

        await fakeSlackHook.log({}, fakeCb);

        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledTimes(0);

        expect(fakeFormatter).toHaveBeenCalledTimes(1);

        expect(fakeCb).toHaveBeenCalledTimes(1);
    });
});

describe("Standard options with custom formatter with ignoring messages", () => {
    const fakeFormatter = jest.fn((info) => {
        if (!info.ignoreMe) {
            return { text: `Custom message: ${info.message}` };
        }
    });

    const fakeOpts = {
        name: "totally-fake-slackhook",
        formatter: fakeFormatter,
        webhookUrl: "https://totally.fake.url",
        channel: "#totally-fake-channel",
        username: "totally-fake-username",
        iconEmoji: ":totally-fake-emoji:",
        iconUrl: "https://totally.fake.icon.url",
        unfurlLinks: true,
        unfurlMedia: true,
        mrkdwn: true
    };

    let fakeSlackHook;

    beforeAll(() => {
        jest.clearAllMocks();
        fakeSlackHook = new SlackHook(fakeOpts);
    });

    beforeEach(() => {
        jest.resetModules();
    });

    test("checks if parameters are correct", async () => {
        expect(fakeSlackHook).toBeInstanceOf(SlackHook);
        expect(fakeSlackHook.name).toEqual(fakeOpts.name);
        expect(fakeSlackHook.formatter).toEqual(fakeOpts.formatter);
        expect(fakeSlackHook.webhookUrl).toEqual(fakeOpts.webhookUrl);
        expect(fakeSlackHook.unfurlLinks).toEqual(fakeOpts.unfurlLinks);
        expect(fakeSlackHook.unfurlMedia).toEqual(fakeOpts.unfurlMedia);
        expect(fakeSlackHook.mrkdwn).toEqual(fakeOpts.mrkdwn);
        expect(fakeSlackHook.channel).toEqual(fakeOpts.channel);
        expect(fakeSlackHook.username).toEqual(fakeOpts.username);
        expect(fakeSlackHook.iconEmoji).toEqual(fakeOpts.iconEmoji);
        expect(fakeSlackHook.iconUrl).toEqual(fakeOpts.iconUrl);
        expect(axios.create).toHaveBeenCalledTimes(1);
    });

    test("log function gets called with correct params", async () => {
        const fakeCb = jest.fn();
        const fakePayload = {
            attachments: undefined,
            unfurl_links: fakeOpts.unfurlLinks,
            unfurl_media: fakeOpts.unfurlMedia,
            mrkdwn: fakeOpts.mrkdwn,
            channel: fakeOpts.channel,
            username: fakeOpts.username,
            icon_emoji: fakeOpts.iconEmoji,
            icon_url: fakeOpts.iconUrl,
            text: "Custom message: undefined"
        };

        await fakeSlackHook.log({ ignoreMe: true }, fakeCb);
        await fakeSlackHook.log({}, fakeCb);

        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledTimes(1);
        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledWith(
            fakeOpts.webhookUrl,
            fakePayload
        );

        expect(fakeFormatter).toHaveBeenCalledTimes(2);

        expect(fakeCb).toHaveBeenCalledTimes(2);
    });
});

describe("Test Winston 3.x.x integration", () => {
    const fakeFormatter = jest.fn((info) => {
        if (!info.ignoreMe) {
            return { text: `Custom message: ${info.message}` };
        }
    });

    const fakeOpts = {
        name: "totally-fake-slackhook",
        formatter: fakeFormatter,
        webhookUrl: "https://totally.fake.url",
        channel: "#totally-fake-channel",
        username: "totally-fake-username",
        iconEmoji: ":totally-fake-emoji:",
        iconUrl: "https://totally.fake.icon.url",
        unfurlLinks: true,
        unfurlMedia: true,
        mrkdwn: true
    };

    let fakeWinston, fakeSlackHook;

    beforeAll(() => {
        jest.clearAllMocks();
        fakeSlackHook = new SlackHook(fakeOpts);
        fakeWinston = createLogger({
            transports: [fakeSlackHook]
        });
    });

    beforeEach(() => {
        jest.resetModules();
    });

    test("checks if parameters are correct", async () => {
        expect(fakeSlackHook).toBeInstanceOf(SlackHook);
        expect(fakeSlackHook.name).toEqual(fakeOpts.name);
        expect(fakeSlackHook.formatter).toEqual(fakeOpts.formatter);
        expect(fakeSlackHook.webhookUrl).toEqual(fakeOpts.webhookUrl);
        expect(fakeSlackHook.unfurlLinks).toEqual(fakeOpts.unfurlLinks);
        expect(fakeSlackHook.unfurlMedia).toEqual(fakeOpts.unfurlMedia);
        expect(fakeSlackHook.mrkdwn).toEqual(fakeOpts.mrkdwn);
        expect(fakeSlackHook.channel).toEqual(fakeOpts.channel);
        expect(fakeSlackHook.username).toEqual(fakeOpts.username);
        expect(fakeSlackHook.iconEmoji).toEqual(fakeOpts.iconEmoji);
        expect(fakeSlackHook.iconUrl).toEqual(fakeOpts.iconUrl);
        expect(axios.create).toHaveBeenCalledTimes(1);
    });

    test("log function gets called with correct params", () => {
        const fakeCb = jest.fn();
        const fakePayload = {
            attachments: undefined,
            unfurl_links: fakeOpts.unfurlLinks,
            unfurl_media: fakeOpts.unfurlMedia,
            mrkdwn: fakeOpts.mrkdwn,
            channel: fakeOpts.channel,
            username: fakeOpts.username,
            icon_emoji: fakeOpts.iconEmoji,
            icon_url: fakeOpts.iconUrl,
            text: "Custom message: Logged"
        };

        fakeWinston.info("Me ignored", { ignoreMe: true }, fakeCb);

        fakeWinston.info("Logged", { ignoreMe: false }, fakeCb);

        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledTimes(1);
        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledWith(
            fakeOpts.webhookUrl,
            fakePayload
        );

        expect(fakeFormatter).toHaveBeenCalledTimes(2);
    });
});

describe("Error handling", () => {
    const fakeOpts = {
        name: "totally-fake-slackhook",
        formatter: "totally-fake-formatter",
        webhookUrl: "https://totally.fake.url",
        channel: "#totally-fake-channel",
        username: "totally-fake-username",
        iconEmoji: ":totally-fake-emoji:",
        iconUrl: "https://totally.fake.icon.url",
        unfurlLinks: true,
        unfurlMedia: true,
        mrkdwn: true,
        emitAxiosErrors: false
    };

    let fakeSlackHookNoEmit, fakeSlackHookEmit, noEmitSpy, emitSpy;

    beforeAll(() => {
        jest.clearAllMocks();
        fakeSlackHookNoEmit = new SlackHook(fakeOpts);
        fakeSlackHookEmit = new SlackHook(
            Object.assign({}, fakeOpts, { emitAxiosErrors: true })
        );

        noEmitSpy = jest.spyOn(fakeSlackHookNoEmit, "emit");
        emitSpy = jest.spyOn(fakeSlackHookEmit, "emit");

        fakeSlackHookEmit.on("error", () => {});
    });

    beforeEach(() => {
        jest.resetModules();
    });

    test("Does not emit an error when emitAxiosErrors is false", async () => {
        fakeSlackHookNoEmit.axiosInstance.post = jest
            .fn(() => {})
            .mockRejectedValueOnce(
                new AxiosError("Request failed with status code 418", "ERR_BAD_REQUEST")
            );

        const fakeCb = jest.fn();

        await fakeSlackHookNoEmit.log({}, fakeCb);

        expect(noEmitSpy).toHaveBeenCalledTimes(0);
        expect(fakeCb).toHaveBeenCalledTimes(1);
    });

    test("Emits an error when emitAxiosErrors is true", async () => {
        fakeSlackHookEmit.axiosInstance.post = jest
            .fn(() => {})
            .mockRejectedValueOnce(
                new AxiosError("Request failed with status code 418", "ERR_BAD_REQUEST")
            );

        const fakeCb = jest.fn();

        await fakeSlackHookEmit.log({}, fakeCb);

        expect(emitSpy).toHaveBeenCalledTimes(1);
        expect(emitSpy).toHaveBeenCalledWith("error", expect.anything());
        expect(fakeCb).toHaveBeenCalledTimes(1);
    });
});
