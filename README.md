<p align="center">
  <img src="" alt="Printly App Logo" width="180" height="auto"/>
</p>

<h2>
 Printly
  <a href="https://travis-ci.org/hql287/Manta">
    <img src="https://travis-ci.org/hql287/Manta.svg?branch=dev" alt="Build Status">
  </a>
  <a href="https://github.com/hql287/Manta/releases/tag/v1.1.4">
    <img src="https://img.shields.io/badge/version-1.1.4-green.svg" alt="v1.1.4">
  </a>
  <a title="Crowdin" target="_blank" href="https://crowdin.com/project/manta">
    <img src="https://d322cqt584bo4o.cloudfront.net/manta/localized.svg">
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-GPL--3.0-blue.svg">
  </a>
</h2>

A desktop application for creating invoices with beautiful and customizable templates.

<a href="#screenshots">Screenshots</a> •
<a href="#features">Features</a> •
<a href="#downloads">Downloads</a> •
<a href="#technologies">Technologies</a> •
<a href="#why">Why?</a> •
<a href="#goals">Goals</a> •
<a href="#development">Development</a> •
<a href="#faq">FAQ</a> •
<a href="#acknowledgement">Acknowledgement</a>

### Screenshots



### Translation

Do you speak multiple languages? We need your help!

If you're interested in translating Manta, please see the [detailed instruction here](https://github.com/hql287/Manta/wiki/Translating-Manta).
The following languages are currently being translated, if you would like to Manta to support another language, [please submit your request here](https://github.com/hql287/Manta/issues/9).

* [🇨🇳 中文 (Chinese Simplified)](https://crowdin.com/project/manta/zh-CN#)
* [🇨🇳 中文 (Chinese Traditional)](https://crowdin.com/project/manta/zh-TW#)
* [🇩🇪 Deutsch (German)](https://crowdin.com/project/manta/de#)
* [🇩🇰 Dansk (Danish)](https://crowdin.com/project/manta/da#)
* [🇪🇸 Español (Spanish)](https://crowdin.com/project/manta/es-ES)
* [🇫🇷 Français (French)](https://crowdin.com/project/manta/fr#)
* [🇬🇷 Ελληνικά (Greek)](https://crowdin.com/project/manta/el#)
* [🇮🇩 Indonesian](https://crowdin.com/project/manta/id#)
* [🇮🇹 Italiano (Italian)](https://crowdin.com/project/manta/it#)
* [🇯🇵 日本語 (Japanese)](https://crowdin.com/project/manta/ja#)
* [🇰🇷 한국어 (Korean)](https://crowdin.com/project/manta/ko#)
* [🇱🇹 Lietuviškai (Lithuanian)](https://crowdin.com/project/manta/lt#)
* [🇳🇱 Nederlands (Dutch)](https://crowdin.com/project/manta/nl#)
* [🇵🇹 Português (Portuguese)](https://crowdin.com/project/manta/pt-PT#)
* [🇧🇷 Portuguese, Brazilian (Brazil)](https://crowdin.com/project/manta/pt-BR#)
* [🇷🇺 Русский (Russian)](https://crowdin.com/project/manta/ru#)
* [🇹🇭 ไทย (Thai)](https://crowdin.com/project/manta/th#)
* [🇹🇷 Türkçe (Turkish)](https://crowdin.com/project/manta/tr#)
* [🇻🇳 Việt Nam (Vietnamese)](https://crowdin.com/project/manta/vi)

### Features
* 🎚 Flexible form. You can turn on/off field and save as default setting.
* 🏗 Drag & drop for reordering items. This makes editing easier.
* 📐 Use SVGs for logo for better printing.
* 🎨  Custom designed & highly customizable templates.
* 🏷 Custom statuses for invoices.
* 📊 Export PDF for print or email.
* 🔒Complete Privacy. You financial data stays where it belongs.

### Downloads

macOS | Windows | Linux
-----------------| ---| ---|
<a href='https://github.com/hql287/Manta/releases/download/v1.1.4/Manta-1.1.4.dmg'>Download v1.1.4</a> | <a href='https://github.com/hql287/Manta/releases/download/v1.1.4/Manta.Setup.1.1.4.exe'>Download v1.1.4</a> | <a href='https://github.com/hql287/Manta/releases/download/v1.1.4/Manta-1.1.4-x86_64.AppImage'>Download v1.1.4</a> |

[More Download Options](https://github.com/hql287/Manta/releases)

#### Supported Platforms
Following platforms are supported by Electron:

**macOS**
The minimum version supported is macOS 10.9.

**Windows**
Windows 7 and later are supported

**Linux:**

- Ubuntu 12.04 and later
- Fedora 21
- Debian 8

[More information](https://github.com/electron/electron/blob/master/docs/tutorial/supported-platforms.md).

Note that on Linux, some users might experience a GPU bug where the select options rendered as a black box, see [issue #128 of Manta](https://github.com/hql287/Manta/pull/128) and [issue #4322 of Electron](https://github.com/electron/electron/issues/4322). This can be fixed by disabling hardware acceleration like so:

```sh
manta --disable-hardware-acceleration
```

> Remember that doing this might lead to some degradation of the app's performance. This is why "the fix" is not included by default.

### Technologies
* [Electron](https://github.com/electron/electron)
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [React-DnD](https://github.com/react-dnd/react-dnd)
* [React-Beautiful-DnD](https://github.com/atlassian/react-beautiful-dnd)
* [React-Motion](https://github.com/chenglou/react-motion)
* [Webpack](https://github.com/webpack/webpack)


### Why
The main reason I decided to build this is because I need a simple tool to create good looking invoices, estimates, and receipts but couldn't find one  that suits my needs. I don't do invoicing for a living but I do need it occasionally so an ideal invoicing app just needs to be good at one thing and one thing only, which is making invoices. I really don't need a full-fledged bookkeeping or accounting software.

I believe there are many people such as freelance designers, developers, photographers or writers... also have such need. However, most (if not all) products I found have these these problems:

**Complexity**

* Most invoicing products nowadays is web-based, which means you’ll need to maintain a new account (possible a monthly fee, too) just to create an invoice.
* Sure, there some open-source products that can be self-hosted, but that will introduce a new layer of complexity to your workflow. Who will setup the product? Who will maintain the server? Who will cover the cost? ...
* You will always need internet connection to be able to create your invoices. It can be slow sometimes.

**Privacy**

* When you use a web service, most of the time, you’re giving away your data whether you want it or not. Financial data is sensitive and I believe that no one should know about your data except yourself.


### Goals
With that in mind, I know that Manta would need to satisfy these criteria:

* 🚀 Fast!!!
* 👍 Friendly UI & UX
* 🎉 Has nice looking templates
* 🔒 Does not touch user’s data

### Development

It's very easy to get started with these 3 steps:

* Clone this project to your local machine.
* Open terminal and `cd` into the cloned folder, usually `cd Manta`.
* Run `yarn install` to install dependencies.
* Run `yarn dev` in one tab to start `webpack-dev-server`.
* Run `yarn start` in another tab to open the app.

This is still in beta and it's far from perfect so feedbacks, issues or PRs are greatly appreciated! :)

Note that on Linux you will need additional dependencies to provide the `icns2png` and `gm` commands.
Ubuntu/Debian users can run: `sudo apt install -y icnsutils graphicsmagick`.
