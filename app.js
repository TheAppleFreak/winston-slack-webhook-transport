'use strict'

const Transport = require('winston-transport')
const { IncomingWebhook } = require('@slack/client')

module.exports = class SlackHook extends Transport {
  constructor (opts) {
    super(opts)

    opts = opts || {}
    this.name = opts.name || 'slackWebhook'
		// Do I really need the level parameter? Not sure.
		// this.level = opts.level || "info";
    this.formatter = opts.formatter || undefined

    this.webhook = new IncomingWebhook(opts.webhookUrl)
    this.channel = opts.channel || ''
    this.username = opts.username || ''
    this.icon_emoji = opts.iconEmoji || ''
    this.icon_url = opts.iconUrl || ''
    this.unfurl_links = opts.unfurlLinks || ''
    this.markdown = opts.markdown || true
  }

  log (info, callback) {
		// Figure out which keys in info are attachments
    let attachments = []
    let attachmentKeys = Object.keys(info).filter(key => !isNaN(parseInt(key)))

    attachmentKeys.forEach(key => attachments.push(info[key]))

    let payload = {
      channel: this.channel,
      username: this.username,
      icon_emoji: this.iconEmoji,
      icon_url: this.iconUrl,
      unfurl_links: this.unfurlLinks,
      mrkdwn: this.markdown
    }

    if (this.formatter && typeof this.formatter === 'function') {
      payload.text = this.formatter(info)
    } else {
      payload.text = `${info.level}: ${info.message}`
    }

    payload.attachments = attachments

    this.webhook.send(payload, (err, header, statusCode, body) => {
      if (err) {
        setImmediate(() => this.emit('error', err))
      } else {
        setImmediate(() => this.emit('logged', info))
      }
    })

    if (callback && typeof callback === 'function') callback(null, true)
  }
}
