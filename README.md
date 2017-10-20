# winston-slack-webhook-transport

A Slack transport for Winston 3 that logs to a channel via webhooks. 

## Installation 

```
npm install winston winston-slack-webhook-transport
```

## Usage

### Set up with transports

```javascript 
const winston = require("winston");
const SlackHook = require("winston-slack-webhook-transport");

const logger = winston.createLogger({
	level: "info",
	transports: [
		new SlackHook({
			webhookUrl: "https://hooks.slack.com/services/xxx/xxx/xxx"
		})
	]
});

logger.info("This should now appear on Slack");
```

### Set up by adding

```javascript
const winston = require("winston");
const SlackHook = require("winston-slack-webhook-transport");

const logger = winston.createLogger({});

logger.add(SlackHook, {webhookUrl: "https://hooks.slack.com/services/xxx/xxx/xxx"});
```

### Options

* `webhookUrl` - Slack incoming webhook URL. This can be from a basic integration or a bot. **REQUIRED**
* `channel` - Slack channel to post message to.
* `username` - Username to post message with.
* `iconEmoji` - Status icon to post message with. (interchangeable with `iconUrl`)
* `iconUrl` - Status icon to post message with. (interchangeable with `iconEmoji`)
* `formatter` - Custom function to format messages with. By default, messages use the format of `[Level]: [message]`.
* `level` - Level to log. Global settings will apply if this is blank.
* `unfurlLinks` - Enables or disables [link unfurling.](https://api.slack.com/docs/message-attachments#unfurling) (Default: true)
* `markdown` - Enables or disables [Markdown formatting.](https://api.slack.com/docs/message-formatting#disabling_markup_processing) (Default: true)

### Attachments

`winston-slack-webhook-transport` supports the ability to [create attachments on its messages.](https://api.slack.com/docs/message-attachments) To do this, supply an array of objects after the message parameter. 

```javascript
const winston = require("winston");
const SlackHook = require("winston-slack-webhook-transport");

const logger = winston.createLogger({
	level: "info",
	transports: [
		new SlackHook({
			webhookUrl: "https://hooks.slack.com/services/xxx/xxx/xxx"
		})
	]
});

let attachments = [
	{
		"color": "good",
		"author_name": "TheAppleFreak",
		"title": "Hello world",
		"text": "...and here's the attachment text!"
	}
];

logger.info("Here's the regular message text...", attachments);
```

For a complete list of properties, [please check the Slack API documentation.](https://api.slack.com/docs/message-attachments)