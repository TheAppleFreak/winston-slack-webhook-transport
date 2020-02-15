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

## 1.2.0 (2020/2/14)

* Replaced [request](https://github.com/request/request) with [axios](https://github.com/axios/axios) now that [request has been deprecated.](https://github.com/request/request/issues/3142)
* Changed tests to use [Jest](https://jestjs.io/)
* Added proxy server support (as per [Pull #6](https://github.com/TheAppleFreak/winston-slack-webhook-transport/pull/6))
* Added TypeScript declaration file