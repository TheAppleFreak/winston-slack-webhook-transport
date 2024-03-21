# CHANGELOG

(all dates use the ISO-8601 format, which is YYYY/MM/DD)

## 2.3.5 (2024/3/21)

* No changes have been made to the code in this release.
* Updated dependencies.

## 2.3.4 (2024/1/10)

* No changes have been made to the code in this release.
* Updated dependencies, which closes [Pull #32](https://github.com/TheAppleFreak/winston-slack-webhook-transport/pull/32) in the process. 
* Updated copyright year in LICENSE.md

## 2.3.3 (2023/11/11)

* No changes have been made to the code in this release.
* Updated dependencies, which solves [Pull #29](https://github.com/TheAppleFreak/winston-slack-webhook-transport/pull/29) and [Pull #30](https://github.com/TheAppleFreak/winston-slack-webhook-transport/pull/30) while also closing [Issue #31](https://github.com/TheAppleFreak/winston-slack-webhook-transport/issues/31). Thanks @dvasilen!
* Updated `devcontainer.json` to ensure the development environment is using the latest version of Node and NPM available.

## 2.3.2 (2023/5/10)

* The `SlackHookOptions` type now extends `TransportStreamOptions`, properly this time. This change is courtesy of [Pull #28](https://github.com/TheAppleFreak/winston-slack-webhook-transport/pull/28). Thanks again @DominicRoyStang!
* Deprecated v2.3.1 for the above reason. While v2.3.1 should not cause any issues for existing users and use cases, I'd rather not have a potentially buggy version in the wild. 
* Updated GitHub Actions to test against Node.js 16 and the latest available version, instead of just Node.js 16.

## 2.3.1 (2023/5/10)

* The `SlackHookOptions` type now extends `TransportStreamOptions`. This change is courtesy of [Pull #26](https://github.com/TheAppleFreak/winston-slack-webhook-transport/pull/26). Thanks @DominicRoyStang!

## 2.3.0 (2023/4/5)

* Added an option (`emitAxiosErrors`) to enable or disable emitting errors if Axios throws an error. Previously, if Axios returned an error for any reason, this would emit an error, which if unhandled would be treated as an unhandled exception. This includes potentially transient issues, such as if Slack would return an error for any reason, including API outages or `429 Too Many Requests` errors. This option requires the user to explicitly opt into this behavior, and is `false` by default. This closes [Issue #24](https://github.com/TheAppleFreak/winston-slack-webhook-transport/issues/24). Thanks @jbojbo for bringing this to my attention!

  When I had initially added the code that would do that, I was under the impression this would log the Slack error to Winston itself as an error, [but after rereading the relevant documentation](https://github.com/winstonjs/winston#awaiting-logs-to-be-written-in-winston) I realized this was not the case. 
* Minor change to the `log()` function to make it an async function, which simplifies some minor aspects of unit testing. This should have no impact on using the transport within Winston. 
* Updated tests to check the error handling behavior. 
* Added new option to the type definitions. 
* Added a Prettier script and prettierrc. 
* Updated dependencies, and double checked to make sure everything continued to work this time. 

## 2.2.3 (2023/3/3)

* Fixed a bug preventing the ability to filter log messages in the formatter. This change is courtesy of [Pull #23](https://github.com/TheAppleFreak/winston-slack-webhook-transport/pull/23), which closes [Issue #15](https://github.com/TheAppleFreak/winston-slack-webhook-transport/issues/15) in the process. Thanks @ArturAralin and @jbojbo!
* Updated copyright year in LICENSE. I need to automate this.

## 2.2.2 (2022/10/6)

* Reverted axios dependency back to `^0.22.0` due to unforseen issues. This closes [Issue #21](https://github.com/TheAppleFreak/winston-slack-webhook-transport/issues/21).
* Deprecated v2.2.0 and v2.2.1 for the above reason.

## 2.2.1 (2022/10/6)

* Realized that I hadn't quite proofread the code in 2.2.0 as closely as I should have, and that it worked in a different way than I expected. Updated the code and documentation to reflect that you can override the properties in both the constructor as well as in the formatter to achieve the same result.

## 2.2.0 (2022/10/6)

* Readded the `channel`, `username`, `iconEmoji`, and `iconUrl` properties to the constructor and typings. It appears that [Slack seems to have reversed course from how things worked previously, allowing the use of these properties once again](https://api.slack.com/legacy/custom-integrations/messaging/webhooks#legacy-customizations). This change is courtesy of [Pull #19](https://github.com/TheAppleFreak/winston-slack-webhook-transport/pull/19). Thanks @janpieterz!
* Updated copyright year in LICENSE. It seems I have a very good track record of doing this on time. 
* Updated dependencies

## 2.1.0 (2021/10/4)

* You can now return `false` in the formatter function to prevent the plugin from posting a message to Slack. This functionality is courtesy of [Pull #14](https://github.com/TheAppleFreak/winston-slack-webhook-transport/pull/14), which closes [Issue #12](https://github.com/TheAppleFreak/winston-slack-webhook-transport/issues/12) in the process. Thanks @iedmrc and @daxadal!
* Updated documentation and typings to reflect the above change.
* Removed Yarn as the package manager in favor of using NPM instead. 
* Set up Github Actions to simplify the process of updating the package on NPM in the future.
* Updated copyright year in LICENSE. Probably should have done that about 10 months ago... ¯\\_(ツ)_/¯
* Updated dependencies

## 2.0.0 (2020/8/14)

**WARNING**: This is a potentially **BREAKING CHANGE**.

* **BREAKING**: Removed the `channel`, `username`, `iconEmoji`, and `iconUrl` properties from the constructor and typings. According to Slack, [these properties cannot be overridden by webhooks](https://api.slack.com/messaging/webhooks#advanced_message_formatting) so it makes no sense to include them and potentially confuse users. As per semantic versioning, I am bumping the version to 2.0.0 to prevent existing clients using these features from suddenly breaking unexpectedly. Nothing else about the code has been modified at this time.
* Removed checks for the aforementioned properties in the tests.
* Fixed link rot in README.md and added a little more detail to the package instructions.
* Modified package.json to only bundle the files needed to use the package. Sorry about accidentally bloating the package size to over 2MB because I left the Yarn executable in...
* Updated copyright year in LICENSE
* Updated dependencies

## 1.2.5 (2020/7/29)

* Updated dependencies
* Updated gitignore to latest Node version
* Fixed error in README.md (as per [Pull #11](https://github.com/TheAppleFreak/winston-slack-webhook-transport/pull/11)). Thanks @zachweinberg!
* Changed all tabs in README.md to spaces for a more unified presentation
* Changed `test` script to not point directly at the Jest executable anymore
* Added Yarn 2 files
* Updated yarn.lock so that GitHub would stop yelling at me about lodash being out of date

## 1.2.4 (2020/5/7)

* Updated yarn.lock so that GitHub would stop yelling at me about acorn being out of date

## 1.2.3 (2020/5/7)

* Updated dependencies

## 1.2.2 (2020/5/7)

* Fixed TypeScript declaration file (as per [Pull #9](https://github.com/TheAppleFreak/winston-slack-webhook-transport/pull/9)). Thanks @dmitryyacenko and @xr!

## 1.2.1 (2020/2/28)

* Fixed TypeScript declaration file (as per [Issue #7](https://github.com/TheAppleFreak/winston-slack-webhook-transport/issues/7)). Thanks @FredericLatour!

## 1.2.0 (2020/2/14)

* Replaced [request](https://github.com/request/request) with [axios](https://github.com/axios/axios) now that [request has been deprecated.](https://github.com/request/request/issues/3142)
* Changed tests to use [Jest](https://jestjs.io/)
* Added proxy server support (as per [Pull #6](https://github.com/TheAppleFreak/winston-slack-webhook-transport/pull/6)). Thanks @gumkins!
* Added TypeScript declaration file

## 1.1.0 (2019/7/15)

* Callback now triggers only after request completes (as per [Pull #4](https://github.com/TheAppleFreak/winston-slack-webhook-transport/pull/4)). Thanks @iudelsmann!

## 1.0.1 (2019/6/21)

* Updated dependencies

## 1.0.0 (2019/3/5)

**WARNING** - This is a **BREAKING CHANGE**. 

* Reworked the logger so it uses [request](https://github.com/request/request) instead of the much heavier Slack API.
* Added support for the new [Layout Blocks](https://api.slack.com/messaging/composing/layouts) formatting option that Slack recently introduced.
* Implemented formatter suggestion from [Issue #2](https://github.com/TheAppleFreak/winston-slack-webhook-transport/issues/2) to tidy up the logger calls. 
* Removed the old method of attaching attachments, also as a suggestion from Issue #2.
