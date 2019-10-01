'use strict';

const Transport = require('winston-transport');
const request = require('request');

module.exports = class SlackHook extends Transport {
  constructor (opts) {
    super(opts);

    opts = opts || {};

    this.name = opts.name || 'slackWebhook';
    // Do I really need the level parameter? Not sure.
    this.level = opts.level || "info";
    this.webhookUrl = opts.webhookUrl;
    this.formatter = opts.formatter || undefined;
    this.channel = opts.channel || '';
    this.username = opts.username || '';
    this.iconEmoji = opts.iconEmoji || '';
    this.iconUrl = opts.iconUrl || '';
    this.unfurlLinks = opts.unfurlLinks || false;
    this.unfurlMedia = opts.unfurlMedia || false;
    this.mrkdwn = opts.mrkdwn || false;

    this.request = request.defaults({ proxy: opts.proxy });
  }

  log (info, callback) {
		let payload = {
      channel: this.channel,
      username: this.username,
      icon_emoji: this.iconEmoji,
      icon_url: this.iconUrl,
      unfurl_links: this.unfurlLinks,
      unfurl_media: this.unfurlMedia,
      mrkdwn: this.mrkdwn
    }

    if (this.formatter && typeof this.formatter === 'function') {
      let layout = this.formatter(info);

      // Note: Apparently you can't have `text` and `blocks` on the same message
      // If you're making a formatter, use blocks to simulate the vanilla text
      payload.text = layout.text || undefined;
      payload.attachments = layout.attachments || undefined;
      payload.blocks = layout.blocks || undefined;
    } else {
      payload.text = `${info.level}: ${info.message}\n\`\`\`${info.stack}\`\`\``;
    }

    request.post({url: this.webhookUrl, json: payload}, (err, res, body) => {
      if (err) {
        this.emit('error', err);
        callback();
      } else {
        this.emit('logged', info);
        callback();
      }
    });
  }
};
