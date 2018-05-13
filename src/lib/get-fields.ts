export interface IField {
  closeTag: string;
  name: keyof ICommit;
  openTag: string;
  placeholder: string;
}

export interface ICommit {
  authorDate?: string;
  authorDateRelative?: string;
  authorEmail?: string;
  authorName?: string;
  body?: string;
  commitHash?: string;
  commitNotes?: string;
  committerDate?: string;
  committerDateRelative?: string;
  committerEmail?: string;
  committerName?: string;
  parentHashes?: string;
  reflogIdentityEmail?: string;
  reflogIdentityName?: string;
  reflogSelector?: string;
  reflogSubject?: string;
  sanitizedSubjectLine?: string;
  subject?: string;
  treeHash?: string;
}

export type FieldName = keyof ICommit;

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
