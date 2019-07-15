# CHANGELOG

## 1.0.0 (2019/3/5)

**WARNING** - This is a **BREAKING CHANGE**. 

* Reworked the logger so it uses [request](https://github.com/request/request) instead of the much heavier Slack API.
* Added support for the new [Layout Blocks](https://api.slack.com/messaging/composing/layouts) formatting option that Slack recently introduced.
* Implemented formatter suggestion from [Issue #2](https://github.com/TheAppleFreak/winston-slack-webhook-transport/issues/2) to tidy up the logger calls. 
* Removed the old method of attaching attachments, also as a suggestion from Issue #2.

## 1.0.1 (2019/6/21)

* Updated dependencies

## 1.1.0 (2019/7/15)

* Callback now triggers only after request completes (as per [Pull #4](https://github.com/TheAppleFreak/winston-slack-webhook-transport/pull/4)).