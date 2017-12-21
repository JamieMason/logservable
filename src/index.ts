import { Observable } from 'rxjs/Rx';
import { getFields } from './lib/get-fields';
import { readGitLog } from './lib/read-git-log';
import { readGitTags } from './lib/read-git-tags';
import { streamProcess } from './lib/stream-process';
import { FieldName, ICommit, IField, ITag } from './typings';

export const commits = (directory: string, fieldNames?: FieldName[], oldestFirst?: boolean) => {
  const fields = getFields(fieldNames);
  return streamProcess<ICommit>({
    mapData: (stdout) => {
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
    start: () => readGitLog(directory, fields, oldestFirst)
  });
};

export const tags = (directory: string) =>
  streamProcess<ITag>({
    mapData: (stdout) =>
      stdout
        .split('\n')
        .filter(Boolean)
        .map((line) => line.split(' refs/tags/'))
        .map(([commitHash, tagName]) => ({ commitHash, tagName })),
    start: () => readGitTags(directory)
  });
