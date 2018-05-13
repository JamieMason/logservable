import { FieldName, ICommit, IField } from '../index';

const placeholders: ICommit = {
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

const everyFieldName: FieldName[] = Object.keys(placeholders) as FieldName[];

export const getFields = (fieldNames: FieldName[] = everyFieldName) =>
  fieldNames.map((key): IField => ({
    closeTag: `</${key}>`,
    name: key,
    openTag: `<${key}>`,
    placeholder: placeholders[key] || ''
  }));
