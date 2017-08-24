# logservable

[![NPM version](http://img.shields.io/npm/v/logservable.svg?style=flat-square)](https://www.npmjs.com/package/logservable)
[![NPM downloads](http://img.shields.io/npm/dm/logservable.svg?style=flat-square)](https://www.npmjs.com/package/logservable)
[![Dependency Status](http://img.shields.io/david/JamieMason/logservable.svg?style=flat-square)](https://david-dm.org/JamieMason/logservable)
[![Gitter Chat for logservable](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/JamieMason/logservable)
[![Donate via PayPal](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.me/foldleft)
[![Donate via Gratipay](https://img.shields.io/gratipay/user/JamieMason.svg)](https://gratipay.com/~JamieMason/)
[![Analytics](https://ga-beacon.appspot.com/UA-45466560-5/logservable?flat&useReferer)](https://github.com/igrigorik/ga-beacon)
[![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
[![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)

`git log` as an observable stream of JSON.

## Installation

```
npm install --save logservable
```

## Usage

`logservable(directory, fields)` returns a [Stream](https://github.com/staltz/xstream#stream);

```js
import logservable from 'logservable';

const log$ = logservable('/Users/foldleft/Dev/my-project', [
  'authorDateRelative',
  'authorName',
  'commitHash'
]);
```

Which takes a [Listener](https://github.com/staltz/xstream#listener);

```js
const listener = {
  next(commit) {
    console.log(
      '%s committed %s %s',
      commit.authorName,
      commit.commitHash,
      commit.authorDateRelative
    );
  },
  error(err) {
    console.error('The Stream gave me an error: ', err);
  },
  complete() {
    console.log('The Stream told me it is done.');
  }
};
```

Which can be subscribed to as follows;

```js
log$.take(3).addListener(listener);
```

Our example would produce;

```
Guybrush Threepwood committed ad7b84e54c62809c7d46b9bb77087a007d1967b5 2 hours ago
Elaine Marley committed 12c1cde06cdca28d9b41c9cdf667b3e4ff894ca1 2 hours ago
Herman Toothrot committed 60121fda22cd43a04716c8a76fa803bf1a81e217 6 hours ago
The Stream told me it is done.
```

## API

### `directory:String`

Absolute path to your locally cloned git repository.

### `fields:String[]`

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

For more information see the [Git Pretty Formats Documentation.](https://git-scm.com/docs/pretty-formats).
