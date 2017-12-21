import { ChildProcess } from 'child_process';
import { Observable } from 'rxjs/Rx';

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

export interface ITag {
  commitHash?: string;
  tagName?: string;
}

export interface IField {
  closeTag: string;
  name: keyof ICommit;
  openTag: string;
  placeholder: string;
}

export interface IStreamProcessOptions {
  mapData: (stdout: string) => any;
  start: () => ChildProcess;
}

export type StreamProcessor = <T>(options: IStreamProcessOptions) => Observable<T>;
