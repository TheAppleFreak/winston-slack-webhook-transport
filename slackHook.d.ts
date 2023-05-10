import Transport = require("winston-transport");

declare class SlackHook extends Transport {
    constructor(opts: SlackHook.SlackHookOptions);
}

declare namespace SlackHook {
    interface TransformableInfo {
        level: string;
        message: string;
        [key: string]: any;
    }

    interface SlackMessage {
        text?: string;
        attachments?: any[];
        blocks?: any[];
        icon_emoji?: string;
        username?: string;
        icon_url?: string;
        channel?: string;
    }

    interface SlackHookOptions extends Transport.TransportStreamOptions {
        /**
         * Slack incoming webhook URL.
         *
         * {@link https://api.slack.com/messaging/webhooks Follow steps 1 through 3 at this link to create a new webhook if you don't already have one}.
         */
        webhookUrl: string;
        name?: string;
        /**
         * Custom function to format messages with. This function accepts the `info` object ({@link https://github.com/winstonjs/winston/blob/master/README.md#streams-objectmode-and-info-objects see Winston documentation}) and must return an object with at least one of the following three keys: `text` (string), `attachments` (array of {@link https://api.slack.com/messaging/composing/layouts#attachments attachment objects}), `blocks` (array of {@link https://api.slack.com/messaging/composing/layouts#adding-blocks layout block objects}). These will be used to structure the format of the logged Slack message. By default, messages will use the format of `[level]: [message]` with no attachments or layout blocks. Return `false` to prevent this plugin from posting to Slack.
         */
        formatter?: (info: TransformableInfo) => SlackMessage | false;
        /**
         * Level to log. Global settings will apply if left undefined.
         */
        level?: string;
        /**
         * Enables or disables {@link https://api.slack.com/reference/messaging/link-unfurling#no_unfurling_please link unfurling}. (Default: `false`)
         */
        unfurlLinks?: boolean;
        /**
         * Enables or disables {@link https://api.slack.com/reference/messaging/link-unfurling#no_unfurling_please media unfurling}. (Default: `false`)
         */
        unfurlMedia?: boolean;
        /**
         * Enables or disables {@link https://api.slack.com/reference/surfaces/formatting#basics `mrkdwn` formatting} within attachments or layout blocks. (Default: `false`)
         */
        mrkdwn?: boolean;
        /**
         * Allows specifying a proxy server that {@link https://github.com/axios/axios#request-config gets passed directly down to Axios} (Default: `undefined`)
         */
        proxy?: any;
        /**
         * Overrides the webhook's default channel. This should be a channel ID. (Default: `undefined`)
         */
        channel?: string;
        /**
         * Overrides the webhook's default username. (Default: `undefined`)
         */
        username?: string;
        /**
         * An {@link https://www.webpagefx.com/tools/emoji-cheat-sheet/ emoji code string} to use in place of the default icon. Interchangeable with `iconUrl`. (Default: `undefined`)
         */
        iconEmoji?: string;
        /**
         * An icon image URL string to use in place of the default icon. Interchangeable with `iconEmoji`. (Default: `undefined`)
         */
        iconUrl?: string;

        /**
         * Enables or disables {@link https://github.com/winstonjs/winston#awaiting-logs-to-be-written-in-winston emitting errors when Axios throws an error}. This can occur if Slack returns a non-200 response code, such as `429 Too Many Requests`. When disabled, Slack errors will be silently dropped, {@link https://github.com/TheAppleFreak/winston-slack-webhook-transport/issues/24 though if unhandled this can possibly lead to unexpected and transient crashes}. Enable to handle those errors yourself. (Default: `false`)
         */
        emitAxiosErrors?: boolean;
    }
}

export = SlackHook;
