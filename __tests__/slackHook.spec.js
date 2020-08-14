import mockAxios from "../__mocks__/axios";
import SlackHook from "../slackHook";

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