import mockAxios from "../__mocks__/axios";
import SlackHook from "../slackHook";

describe ("Standard options", () => {
    const fakeOpts = {
        name: 'totally-fake-slackhook',
        formatter: 'totally-fake-formatter',
        webhookUrl: 'https://totally.fake.url',
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
    })

    it("checks if parameters are correct", () => {
        expect(fakeSlackHook).toBeInstanceOf(SlackHook);
        expect(fakeSlackHook.name).toEqual(fakeOpts.name);
        expect(fakeSlackHook.formatter).toEqual(fakeOpts.formatter);
        expect(fakeSlackHook.webhookUrl).toEqual(fakeOpts.webhookUrl);
        expect(fakeSlackHook.unfurlLinks).toEqual(fakeOpts.unfurlLinks);
        expect(fakeSlackHook.unfurlMedia).toEqual(fakeOpts.unfurlMedia);
        expect(fakeSlackHook.mrkdwn).toEqual(fakeOpts.mrkdwn);
        expect(mockAxios.create).toHaveBeenCalledTimes(1);
    });

    it("log function gets called with correct params", () => {
        const fakeCb = jest.fn();
        const fakePayload = {
            unfurl_links: fakeOpts.unfurlLinks,
            unfurl_media: fakeOpts.unfurlMedia,
            mrkdwn: fakeOpts.mrkdwn,
            text: 'undefined: undefined'
        };

        fakeSlackHook.log({}, fakeCb);

        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledTimes(1);
        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledWith(
            fakeOpts.webhookUrl,
            fakePayload
        );
    })
})

describe ("Standard options with custom formatter", () => {
    const fakeFormatter = jest.fn((info) => ({ text: `Custom message: ${info.message}` }));
    const fakeOpts = {
        name: 'totally-fake-slackhook',
        formatter: fakeFormatter,
        webhookUrl: 'https://totally.fake.url',
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
    })

    it("checks if parameters are correct", () => {
        expect(fakeSlackHook).toBeInstanceOf(SlackHook);
        expect(fakeSlackHook.name).toEqual(fakeOpts.name);
        expect(fakeSlackHook.formatter).toEqual(fakeOpts.formatter);
        expect(fakeSlackHook.webhookUrl).toEqual(fakeOpts.webhookUrl);
        expect(fakeSlackHook.unfurlLinks).toEqual(fakeOpts.unfurlLinks);
        expect(fakeSlackHook.unfurlMedia).toEqual(fakeOpts.unfurlMedia);
        expect(fakeSlackHook.mrkdwn).toEqual(fakeOpts.mrkdwn);
        expect(mockAxios.create).toHaveBeenCalledTimes(1);
    });

    it("log function gets called with correct params", () => {
        const fakeCb = jest.fn();
        const fakePayload = {
            attachments: undefined,
            unfurl_links: fakeOpts.unfurlLinks,
            unfurl_media: fakeOpts.unfurlMedia,
            mrkdwn: fakeOpts.mrkdwn,
            text: 'Custom message: undefined'
        };

        fakeSlackHook.log({}, fakeCb);

        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledTimes(1);
        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledWith(
            fakeOpts.webhookUrl,
            fakePayload
        );

        expect(fakeFormatter).toHaveBeenCalledTimes(1);
    })
})

describe ("Custom options with custom formatter", () => {
    const fakeFormatter = jest.fn((info) => ({ text: `Custom message: ${info.message}`, icon_url: "a", username: "b", icon_emoji: "c", channel:"d"  }));
    const fakeOpts = {
        name: 'totally-fake-slackhook',
        formatter: fakeFormatter,
        webhookUrl: 'https://totally.fake.url',
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
    })
    
    it("log function gets called with correct params", () => {
        const fakeCb = jest.fn();
        const fakePayload = {
            attachments: undefined,
            unfurl_links: fakeOpts.unfurlLinks,
            unfurl_media: fakeOpts.unfurlMedia,
            mrkdwn: fakeOpts.mrkdwn,
            text: 'Custom message: undefined',
            icon_url: "a", 
            username: "b", 
            icon_emoji: "c", 
            channel:"d"  
        };

        fakeSlackHook.log({}, fakeCb);

        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledTimes(1);
        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledWith(
            fakeOpts.webhookUrl,
            fakePayload
        );

        expect(fakeFormatter).toHaveBeenCalledTimes(1);
    })
})

describe ("Standard options with formatter that filters out all messages", () => {
    const fakeFormatter = jest.fn((info) => false);
    const fakeOpts = {
        name: 'totally-fake-slackhook',
        formatter: fakeFormatter,
        webhookUrl: 'https://totally.fake.url',
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
    })

    it("checks if parameters are correct", () => {
        expect(fakeSlackHook).toBeInstanceOf(SlackHook);
        expect(fakeSlackHook.name).toEqual(fakeOpts.name);
        expect(fakeSlackHook.formatter).toEqual(fakeOpts.formatter);
        expect(fakeSlackHook.webhookUrl).toEqual(fakeOpts.webhookUrl);
        expect(fakeSlackHook.unfurlLinks).toEqual(fakeOpts.unfurlLinks);
        expect(fakeSlackHook.unfurlMedia).toEqual(fakeOpts.unfurlMedia);
        expect(fakeSlackHook.mrkdwn).toEqual(fakeOpts.mrkdwn);
        expect(mockAxios.create).toHaveBeenCalledTimes(1);
    });

    it("log function gets called with correct params", () => {
        const fakeCb = jest.fn();
        const fakePayload = {
            unfurl_links: fakeOpts.unfurlLinks,
            unfurl_media: fakeOpts.unfurlMedia,
            mrkdwn: fakeOpts.mrkdwn,
            text: 'undefined: undefined'
        };

        fakeSlackHook.log({}, fakeCb);

        expect(fakeSlackHook.axiosInstance.post).toHaveBeenCalledTimes(0);

        expect(fakeFormatter).toHaveBeenCalledTimes(1);
    })
})