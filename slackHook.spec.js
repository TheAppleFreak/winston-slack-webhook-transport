import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import request from 'request';
import SlackHook from './slackHook';

chai.use(sinonChai);

const sandbox = sinon.createSandbox();

const fakeRequest = sandbox.stub(request);
const fakeTransport = { winston: 'fake' };
const fakeTransportClass = sinon.spy(() => fakeTransport);

const dependencies = {
  Transport: fakeTransport,
  request: fakeRequest
};

const fakeOpts = {
  name: 'totally-fake-slackhook',
  formatter: 'totally-fake-formatter',
  webhookUrl: 'https://totally.fake.url',
  channel: '#totally-fake-channel',
  username: 'totally-fake-username',
  iconEmoji: ':totally-fake-emoji:',
  iconUrl: 'https://totally.fake.icon.url',
  unfurlLinks: true,
  unfurlMedia: true,
  mrkdwn: true
};

let fakeSlackHook;

describe('(class) SlackHook', function () {
  before(function () {
    for (const x of Object.keys(dependencies)) {
      SlackHook.__Rewire__(x, dependencies[x]);
    }
  });

  after(function () {
    for (const x of Object.keys(dependencies)) {
      SlackHook.__ResetDependency__(x);
    }
  });

  beforeEach(function () {
    fakeSlackHook = new SlackHook(fakeOpts);
  });

  afterEach(function () {
    sandbox.reset();
  });

  it('checks if parameters are correct', function () {
    expect(fakeSlackHook).to.be.an.instanceof(SlackHook);
    expect(fakeSlackHook.name).to.equal(fakeOpts.name);
    expect(fakeSlackHook.formatter).to.equal(fakeOpts.formatter);
    expect(fakeSlackHook.webhookUrl).to.equal(fakeOpts.webhookUrl);
    expect(fakeSlackHook.channel).to.equal(fakeOpts.channel);
    expect(fakeSlackHook.username).to.equal(fakeOpts.username);
    expect(fakeSlackHook.iconEmoji).to.equal(fakeOpts.iconEmoji);
    expect(fakeSlackHook.iconUrl).to.equal(fakeOpts.iconUrl);
    expect(fakeSlackHook.unfurlLinks).to.equal(fakeOpts.unfurlLinks);
    expect(fakeSlackHook.unfurlMedia).to.equal(fakeOpts.unfurlMedia);
    expect(fakeSlackHook.mrkdwn).to.equal(fakeOpts.mrkdwn);
  });

  it('log function gets called with correct params', function () {
    const fakeCb = sandbox.stub();
    const fakePayload = {
      channel: fakeOpts.channel,
      username: fakeOpts.username,
      icon_emoji: fakeOpts.iconEmoji,
      icon_url: fakeOpts.iconUrl,
      unfurl_links: fakeOpts.unfurlLinks,
      unfurl_media: fakeOpts.unfurlMedia,
      mrkdwn: fakeOpts.mrkdwn,
      text: `undefined: undefined
\`\`\`undefined\`\`\``
    };

    const fakeSlackHookLog = fakeSlackHook.log({}, fakeCb);
    expect(fakeRequest.post).to.be.calledWith({url: fakeOpts.webhookUrl, json: fakePayload});
  });
});
