"use strict";

const Transport = require("winston-transport");
const axios = require("axios").default;

module.exports = class SlackHook extends Transport {
    constructor(opts) {
        super(opts);

        opts = opts || {};

        this.name = opts.name || "slackWebhook";
        this.level = opts.level || undefined;
        this.webhookUrl = opts.webhookUrl;
        this.formatter = opts.formatter || undefined;
        this.unfurlLinks = opts.unfurlLinks || false;
        this.unfurlMedia = opts.unfurlMedia || false;
        this.mrkdwn = opts.mrkdwn || false;
        this.channel = opts.channel || "";
        this.username = opts.username || "";
        this.iconEmoji = opts.iconEmoji || "";
        this.iconUrl = opts.iconUrl || "";

        this.emitAxiosErrors = opts.emitAxiosErrors || false;

        this.axiosInstance = axios.create({
            proxy: opts.proxy || undefined
        });
    }

    async log(info, callback) {
        let payload = {
            unfurl_links: this.unfurlLinks,
            unfurl_media: this.unfurlMedia,
            mrkdwn: this.mrkdwn,
            channel: this.channel,
            username: this.username,
            icon_emoji: this.iconEmoji,
            icon_url: this.iconUrl
        };

        if (this.formatter && typeof this.formatter === "function") {
            let layout = this.formatter(info);

            if (!layout) {
                callback();

                return;
            }

            // Note: Supplying `text` when `blocks` is also supplied will cause `text`
            // to be used as a fallback for clients/surfaces that don't suopport blocks
            Object.keys(layout).forEach((key) => {
                payload[key] = layout[key];
            });
        } else {
            payload.text = `${info.level}: ${info.message}`;
        }

        try {
            await this.axiosInstance.post(this.webhookUrl, payload);
            this.emit("logged", info);
        } catch (err) {
            if (this.emitAxiosErrors) this.emit("error", err);
        } finally {
            callback();
        }
    }
};
