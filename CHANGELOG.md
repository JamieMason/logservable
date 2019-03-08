# [4.0.0](https://github.com/JamieMason/logservable/compare/1.3.0...4.0.0) (2019-03-08)


### Bug Fixes

* **core:** export typings correctly ([6582790](https://github.com/JamieMason/logservable/commit/6582790))


### Features

* **commits:** skip merge commits by default ([a7869b4](https://github.com/JamieMason/logservable/commit/a7869b4))
* **core:** create an options argument for logservable.commits ([843f1f1](https://github.com/JamieMason/logservable/commit/843f1f1))
* **npm:** move rxjs 6.x to a peer dependency ([7d87f3a](https://github.com/JamieMason/logservable/commit/7d87f3a))


### BREAKING CHANGES

* **commits:** To retain merge commits, set the `skipMergeCommits` option to false.
* **npm:** You will need to `npm install rxjs` if your project does not already
depend on it.
* **core:** ```diff
- const commit$ = logservable.commits(
-   '/Users/foldleft/Dev/my-project',
-   ['authorDateRelative', 'authorName', 'commitHash'],
-   false
- );
+ const commit$ = logservable.commits('/Users/foldleft/Dev/my-project', {
+   fieldNames: ['authorDateRelative', 'authorName', 'commitHash'],
+   oldestFirst: false
+ });
```



# [1.3.0](https://github.com/JamieMason/logservable/compare/1.2.0...1.3.0) (2018-05-13)


### Features

* **core:** only return commits from the given directory ([e2cf938](https://github.com/JamieMason/logservable/commit/e2cf938))



# [1.2.0](https://github.com/JamieMason/logservable/compare/1.1.0...1.2.0) (2017-12-24)


### Features

* **core:** migrate to typescript ([619e45a](https://github.com/JamieMason/logservable/commit/619e45a))



# [1.1.0](https://github.com/JamieMason/logservable/compare/1.0.0...1.1.0) (2017-09-14)


### Features

* **core:** switch from xstream to RxJS ([3b4f3e6](https://github.com/JamieMason/logservable/commit/3b4f3e6))



# [1.0.0](https://github.com/JamieMason/logservable/compare/0.2.0...1.0.0) (2017-08-28)


### Features

* **tags:** add logservable.tags(directory) ([c39e64b](https://github.com/JamieMason/logservable/commit/c39e64b))


### BREAKING CHANGES

* **tags:** logservable() is now logservable.commits()



# [0.2.0](https://github.com/JamieMason/logservable/compare/0.1.1...0.2.0) (2017-08-24)


### Features

* **log:** add option to read log from oldest to newest ([4bd4044](https://github.com/JamieMason/logservable/commit/4bd4044)), closes [#1](https://github.com/JamieMason/logservable/issues/1)



## [0.1.1](https://github.com/JamieMason/logservable/compare/86460b5...0.1.1) (2017-08-21)


### Bug Fixes

* **npm:** update dependencies ([662c618](https://github.com/JamieMason/logservable/commit/662c618))


### Features

* **log:** write git commits from cwd as json objects to stdout ([86460b5](https://github.com/JamieMason/logservable/commit/86460b5))



