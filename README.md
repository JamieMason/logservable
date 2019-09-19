# logservable

> `git log` as an observable stream of JSON.

[![NPM version](http://img.shields.io/npm/v/logservable.svg?style=flat-square)](https://www.npmjs.com/package/logservable) [![NPM downloads](http://img.shields.io/npm/dm/logservable.svg?style=flat-square)](https://www.npmjs.com/package/logservable) [![Build Status](http://img.shields.io/travis/JamieMason/logservable/master.svg?style=flat-square)](https://travis-ci.org/JamieMason/logservable) [![Maintainability](https://api.codeclimate.com/v1/badges/d0a0296af896b46cc528/maintainability)](https://codeclimate.com/github/JamieMason/logservable/maintainability)

## Table of Contents

-   [🌩 Installation](#-installation)
-   [📝 API](#-api)
-   [🙋🏿‍♀️ Getting Help](#♀️-getting-help)
-   [👀 Other Projects](#-other-projects)
-   [🤓 Author](#-author)

## 🌩 Installation

    npm install --save logservable

## 📝 API

### `logservable.commits`

`logservable.commits` returns an [RxJS Observable][observable] which takes an [RxJS Observer][observer];

```js
import { commits } from "logservable";
import { take } from "rxjs/operators";

const commit$ = commits("/Users/foldleft/Dev/my-project", {
  fieldNames: ["authorDateRelative", "authorName", "commitHash"],
  oldestFirst: false
});

commit$.pipe(take(3)).subscribe({
  next(commit) {
    console.log(
      "%s committed %s %s",
      commit.authorName,
      commit.commitHash,
      commit.authorDateRelative
    );
  },
  error(err) {
    console.error("The Stream gave me an error: ", err);
  },
  complete() {
    console.log("The Stream told me it is done.");
  }
});
```

Our example would produce;

    Guybrush Threepwood committed ad7b84e54c62809c7d46b9bb77087a007d1967b5 2 hours ago
    Elaine Marley committed 12c1cde06cdca28d9b41c9cdf667b3e4ff894ca1 2 hours ago
    Herman Toothrot committed 60121fda22cd43a04716c8a76fa803bf1a81e217 6 hours ago
    The Stream told me it is done.

#### Arguments

##### `directory:String`

Absolute path to your locally cloned git repository.

##### `options.fieldNames:String[]`

Optional array of strings representing the data required from each git commit (defaults to all).

    authorDate
    authorDateRelative
    authorEmail
    authorName
    body
    commitHash
    commitNotes
    committerDate
    committerDateRelative
    committerEmail
    committerName
    parentHashes
    reflogIdentityEmail
    reflogIdentityName
    reflogSelector
    reflogSubject
    sanitizedSubjectLine
    subject
    treeHash

For more information see the [Git Pretty Formats Documentation](https://git-scm.com/docs/pretty-formats).

##### `options.oldestFirst:Boolean`

Whether to read the commits in order of oldest to newest (defaults to false).

##### `options.skipMergeCommits:Boolean`

Whether to exclude merge commits from being returned (defaults to true).

### `logservable.tags`

`logservable.tags` returns an [RxJS Observable][observable] which takes an [RxJS Observer][observer];

```js
import { tags } from "logservable";
import { take } from "rxjs/operators";

const tag$ = tags("/Users/foldleft/Dev/my-project");

tag$.pipe(take(3)).subscribe({
  next(tag) {
    console.log("commit %s is tagged as %s", tag.commitHash, tag.tagName);
  },
  error(err) {
    console.error("The Stream gave me an error: ", err);
  },
  complete() {
    console.log("The Stream told me it is done.");
  }
});
```

Our example would produce;

    commit 11eb97230097883288ae565dda7d78b467d8d991 is tagged as 0.1.0
    commit 4b106112ac52c81196e53a4b81cc3543b4aa42c6 is tagged as 0.2.0
    commit 5f6ee8821fbebd01d0910125698afb495c36509c is tagged as 0.3.0
    The Stream told me it is done.

#### Arguments

##### `directory:String`

Absolute path to your locally cloned git repository.

<!-- links -->

[observable]: http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html

[observer]: http://reactivex.io/rxjs/class/es6/MiscJSDoc.js~ObserverDoc.html

## 🙋🏿‍♀️ Getting Help

Get help with issues by creating a [Bug Report] or discuss ideas by opening a [Feature Request].

[bug report]: https://github.com/JamieMason/logservable/issues/new?template=bug_report.md

[feature request]: https://github.com/JamieMason/logservable/issues/new?template=feature_request.md

## 👀 Other Projects

If you find my Open Source projects useful, please share them ❤️

-   [**eslint-formatter-git-log**](https://github.com/JamieMason/eslint-formatter-git-log)<br>ESLint Formatter featuring Git Author, Date, and Hash
-   [**eslint-plugin-move-files**](https://github.com/JamieMason/eslint-plugin-move-files)<br>Move and rename files while keeping imports up to date
-   [**eslint-plugin-prefer-arrow-functions**](https://github.com/JamieMason/eslint-plugin-prefer-arrow-functions)<br>Convert functions to arrow functions
-   [**ImageOptim-CLI**](https://github.com/JamieMason/ImageOptim-CLI)<br>Automates ImageOptim, ImageAlpha, and JPEGmini for Mac to make batch optimisation of images part of your automated build process.
-   [**Jasmine-Matchers**](https://github.com/JamieMason/Jasmine-Matchers)<br>Write Beautiful Specs with Custom Matchers
-   [**karma-benchmark**](https://github.com/JamieMason/karma-benchmark)<br>Run Benchmark.js over multiple Browsers, with CI compatible output
-   [**self-help**](https://github.com/JamieMason/self-help#readme)<br>Interactive Q&A Guides for Web and the Command Line
-   [**syncpack**](https://github.com/JamieMason/syncpack#readme)<br>Manage multiple package.json files, such as in Lerna Monorepos and Yarn Workspaces

## 🤓 Author

<img src="https://www.gravatar.com/avatar/acdf106ce071806278438d8c354adec8?s=100" align="left">

I'm [Jamie Mason] from [Leeds] in England, I began Web Design and Development in 1999 and have been Contracting and offering Consultancy as Fold Left Ltd since 2012. Who I've worked with includes [Sky Sports], [Sky Bet], [Sky Poker], The [Premier League], [William Hill], [Shell], [Betfair], and Football Clubs including [Leeds United], [Spurs], [West Ham], [Arsenal], and more.

<div align="center">

[![Follow JamieMason on GitHub][github badge]][github]      [![Follow fold_left on Twitter][twitter badge]][twitter]

</div>

<!-- images -->

[github badge]: https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow

[twitter badge]: https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow

<!-- links -->

[arsenal]: https://www.arsenal.com

[betfair]: https://www.betfair.com

[github]: https://github.com/JamieMason

[jamie mason]: https://www.linkedin.com/in/jamiemasonleeds

[leeds united]: https://www.leedsunited.com/

[leeds]: https://www.instagram.com/visitleeds

[premier league]: https://www.premierleague.com

[shell]: https://www.shell.com

[sky bet]: https://www.skybet.com

[sky poker]: https://www.skypoker.com

[sky sports]: https://www.skysports.com

[spurs]: https://www.tottenhamhotspur.com

[twitter]: https://twitter.com/fold_left

[west ham]: https://www.whufc.com

[william hill]: https://www.williamhill.com
