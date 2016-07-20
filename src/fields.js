var fields = {
  // author date, relative
  authorDateRelative: '%ar',
  // author date, strict ISO 8601 format
  authorDate: '%aI',
  // author email
  authorEmail: '%aE',
  // author name
  authorName: '%aN',
  // body
  body: '%b',
  // commit hash
  commitHash: '%H',
  // commit notes
  commitNotes: '%N',
  // committer date, relative
  committerDateRelative: '%cr',
  // committer date, strict ISO 8601 format
  committerDate: '%cI',
  // committer email
  committerEmail: '%cE',
  // committer name
  committerName: '%cN',
  // parent hashes
  parentHashes: '%P',
  // reflog identity email
  reflogIdentityEmail: '%gE',
  // reflog identity name
  reflogIdentityName: '%gN',
  // reflog selector
  reflogSelector: '%gD',
  // reflog subject
  reflogSubject: '%gs',
  // sanitized subject line, suitable for a filename
  sanitizedSubjectLine: '%f',
  // subject
  subject: '%s',
  // tree hash
  treeHash: '%T'
};

module.exports = Object.keys(fields)
  .map(function (key) {
    return {
      closeTag: '</' + key + '>',
      name: key,
      openTag: '<' + key + '>',
      placeholder: fields[key]
    };
  });
