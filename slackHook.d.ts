import Transport = require("winston-transport");

declare class SlackHook extends Transport {
    constructor (opts: SlackHook.SlackHookOptions);
}

declare namespace SlackHook {
    interface SlackHookOptions {
        /**
         * Slack incoming webhook URL. This can be from a basic integration or a bot. 
         * 
         * You can get this from the "Incoming Webhooks" section of your Slack app settings: https://api.slack.com/apps
         */
        webhookUrl: string;
        name?: string;
        /**
         * Slack channel to post message to
         */
        channel?: string;
        /**
         * Username to post message with
         */
        username?: string;
        /**
         * Status icon to post message with. Interchangeable with `iconUrl`
         */
        iconEmoji?: string;
        /**
         * Status icon to post message with. Interchangeable with `iconEmoji`
         */
        iconUrl?: string;
        /**
         * Custom function to format messages with. This function accepts the **info** object ({@link https://github.com/winstonjs/winston/blob/master/README.md#streams-objectmode-and-info-objects see Winston documentation}) and must return an object with at least one of the following three keys: **text** (string), **attachments** (array of {@link https://api.slack.com/docs/message-attachments attachment objects}), **blocks** (array of {@link https://api.slack.com/messaging/composing/layouts layout block objects}). These will be used to structure the format of the logged Slack message. By default, messages will use the format of `[level]: [message]` with no attachments or layout blocks.
         */
        formatter?: (info: {
            level: string,
            message: string,
            [key: string]: any
        }) => any;
        /**
         * Level to log. Global settings will apply if this is blank.
         */
        level?: string;
        /**
         * Enables or disables {@link https://api.slack.com/docs/message-attachments#unfurling link unfurling}. (Default: `false`)
         */
        unfurlLinks?: boolean;
        /**
         * Enables or disables {@link https://api.slack.com/docs/message-link-unfurling media unfurling}. (Default: `false`)
         */
        unfurlMedia?: boolean;
        /**
         * Enables or disables {@link https://api.slack.com/messaging/composing/formatting#basics `mrkdwn` formatting} within attachments or layout blocks. (Default: `false`)
         */
        mrkdwn?: boolean;
        /**
         * Allows specifying a proxy server that {@link https://github.com/axios/axios#request-config gets passed directly down to Axios} (Default: `undefined`)
         */
        proxy?: any
    }
}

export = SlackHook;
