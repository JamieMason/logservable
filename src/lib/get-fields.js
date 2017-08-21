const fields = {
  authorDate: '%aI',
  authorDateRelative: '%ar',
  authorEmail: '%aE',
  authorName: '%aN',
  body: '%b',
  commitHash: '%H',
  commitNotes: '%N',
  committerDate: '%cI',
  committerDateRelative: '%cr',
  committerEmail: '%cE',
  committerName: '%cN',
  parentHashes: '%P',
  reflogIdentityEmail: '%gE',
  reflogIdentityName: '%gN',
  reflogSelector: '%gD',
  reflogSubject: '%gs',
  sanitizedSubjectLine: '%f',
  subject: '%s',
  treeHash: '%T'
};

export default (keys = Object.keys(fields)) =>
  keys.map(key => ({
    closeTag: `</${key}>`,
    name: key,
    openTag: `<${key}>`,
    placeholder: fields[key]
  }));
