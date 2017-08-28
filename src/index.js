import getFields from './lib/get-fields';
import readGitLog from './lib/read-git-log';
import readGitTags from './lib/read-git-tags';
import streamProcess from './lib/stream-process';

export const commits = (directory, fieldNames, oldestFirst) => {
  const fields = getFields(fieldNames);
  return streamProcess({
    start: () => readGitLog(directory, fields, oldestFirst),
    mapData: stdout => {
      return stdout.split(/\n?<commit>|<\/commit>\n?/g).filter(Boolean).map(line =>
        fields.reduce((commit, field) => {
          const start = line.indexOf(field.openTag) + field.openTag.length;
          const end = line.indexOf(field.closeTag);
          commit[field.name] = line.substring(start, end).trim();
          return commit;
        }, {})
      );
    }
  });
};

export const tags = directory =>
  streamProcess({
    start: () => readGitTags(directory),
    mapData: stdout =>
      stdout
        .split('\n')
        .filter(Boolean)
        .map(line => line.split(' refs/tags/'))
        .map(([commitHash, tagName]) => ({ commitHash, tagName }))
  });
