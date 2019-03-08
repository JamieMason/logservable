import { ChildProcess } from 'child_process';
import { Observable } from 'rxjs';
import { getFields } from './lib/get-fields';
import { readGitLog } from './lib/read-git-log';
import { readGitTags } from './lib/read-git-tags';
import { streamProcess } from './lib/stream-process';

export interface IStreamProcessOptions {
  mapData: (stdout: string) => any;
  start: () => ChildProcess;
}

export type StreamProcessor = <T>(options: IStreamProcessOptions) => Observable<T>;

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

export interface ITag {
  commitHash?: string;
  tagName?: string;
}

/**
 * @param directory
 * Absolute path to your locally cloned git repository
 *
 * @param options.fieldNames
 * Optional array of strings representing the data required from each git commit (defaults to all)
 * For more information see the [Git Pretty Formats Documentation](https://git-scm.com/docs/pretty-formats)
 *
 * @param options.oldestFirst
 * Whether to read the commits in order of oldest to newest (defaults to false)
 */
export const commits = (
  directory: string,
  {
    fieldNames,
    oldestFirst
  }: {
    fieldNames?: FieldName[];
    oldestFirst?: boolean;
  } = {}
): Observable<ICommit> => {
  const fields = getFields(fieldNames);
  return streamProcess<ICommit>({
    mapData(stdout) {
      return stdout
        .split(/\n?<commit>|<\/commit>\n?/g)
        .filter(Boolean)
        .map((line) =>
          fields.reduce((commit: ICommit, field: IField) => {
            const start = line.indexOf(field.openTag) + field.openTag.length;
            const end = line.indexOf(field.closeTag);
            commit[field.name] = line.substring(start, end).trim();
            return commit;
          }, {})
        );
    },
    start() {
      return readGitLog(directory, fields, oldestFirst);
    }
  });
};

/**
 * @param directory
 * Absolute path to your locally cloned git repository.
 */
export const tags = (directory: string) =>
  streamProcess<ITag>({
    mapData(stdout) {
      return stdout
        .split('\n')
        .filter(Boolean)
        .map((line) => line.split(' refs/tags/'))
        .map(([commitHash, tagName]) => ({ commitHash, tagName }));
    },
    start() {
      return readGitTags(directory);
    }
  });
