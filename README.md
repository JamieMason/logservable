# logservable

> `git log` as an observable stream of JSON.

[![NPM version](http://img.shields.io/npm/v/logservable.svg?style=flat-square)](https://www.npmjs.com/package/logservable)
[![NPM downloads](http://img.shields.io/npm/dm/logservable.svg?style=flat-square)](https://www.npmjs.com/package/logservable)
[![Build Status](http://img.shields.io/travis/JamieMason/logservable/master.svg?style=flat-square)](https://travis-ci.org/JamieMason/logservable)
[![Maintainability](https://api.codeclimate.com/v1/badges/d0a0296af896b46cc528/maintainability)](https://codeclimate.com/github/JamieMason/logservable/maintainability)
[![Gitter Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/JamieMason/logservable)
[![Donate via PayPal](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.me/foldleft)
[![Backers](https://opencollective.com/fold_left/backers/badge.svg)](https://opencollective.com/fold_left#backer)
[![Sponsors](https://opencollective.com/fold_left/sponsors/badge.svg)](https://opencollective.com/fold_left#sponsors)
[![Analytics](https://ga-beacon.appspot.com/UA-45466560-5/logservable?flat&useReferer)](https://github.com/igrigorik/ga-beacon)
[![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
[![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)

## Contents

- [Installation](#installation)
- [`logservable.commits`](#logservablecommits)
  - [`directory:String`](#directorystring)
  - [`fieldNames:String[]`](#fieldnamesstring)
  - [`oldestFirst:Boolean`](#oldestfirstboolean)
- [`logservable.tags`](#logservabletags)
  - [`directory:String`](#directorystring-1)

## Installation

```
npm install --save logservable
```

## `logservable.commits`

`logservable.commits` returns an [RxJS Observable][observable] which takes an [RxJS Observer][observer];

```js
import { commits } from 'logservable';
import { take } from 'rxjs/operators';

const commit$ = commits('/Users/foldleft/Dev/my-project', {
  fieldNames: ['authorDateRelative', 'authorName', 'commitHash'],
  oldestFirst: false
});

commit$.pipe(take(3)).subscribe({
  next(commit) {
    console.log('%s committed %s %s', commit.authorName, commit.commitHash, commit.authorDateRelative);
  },
  error(err) {
    console.error('The Stream gave me an error: ', err);
  },
  complete() {
    console.log('The Stream told me it is done.');
  }
});
```

Our example would produce;

```
Guybrush Threepwood committed ad7b84e54c62809c7d46b9bb77087a007d1967b5 2 hours ago
Elaine Marley committed 12c1cde06cdca28d9b41c9cdf667b3e4ff894ca1 2 hours ago
Herman Toothrot committed 60121fda22cd43a04716c8a76fa803bf1a81e217 6 hours ago
The Stream told me it is done.
```

### Arguments

#### `directory:String`

Absolute path to your locally cloned git repository.

#### `options.fieldNames:String[]`

Optional array of strings representing the data required from each git commit (defaults to all).

```
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
```

For more information see the [Git Pretty Formats Documentation](https://git-scm.com/docs/pretty-formats).

#### `options.oldestFirst:Boolean`

Whether to read the commits in order of oldest to newest (defaults to false).

#### `options.skipMergeCommits:Boolean`

Whether to exclude merge commits from being returned (defaults to true).

## `logservable.tags`

`logservable.tags` returns an [RxJS Observable][observable] which takes an [RxJS Observer][observer];

```js
import { tags } from 'logservable';
import { take } from 'rxjs/operators';

const tag$ = tags('/Users/foldleft/Dev/my-project');

tag$.pipe(take(3)).subscribe({
  next(tag) {
    console.log('commit %s is tagged as %s', tag.commitHash, tag.tagName);
  },
  error(err) {
    console.error('The Stream gave me an error: ', err);
  },
  complete() {
    console.log('The Stream told me it is done.');
  }
});
```

Our example would produce;

```
commit 11eb97230097883288ae565dda7d78b467d8d991 is tagged as 0.1.0
commit 4b106112ac52c81196e53a4b81cc3543b4aa42c6 is tagged as 0.2.0
commit 5f6ee8821fbebd01d0910125698afb495c36509c is tagged as 0.3.0
The Stream told me it is done.
```

### Arguments

#### `directory:String`

Absolute path to your locally cloned git repository.

<!-- links -->

[observable]: http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html
[observer]: http://reactivex.io/rxjs/class/es6/MiscJSDoc.js~ObserverDoc.html
