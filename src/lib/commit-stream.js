import xs from 'xstream';
import getFields from './get-fields';
import readGitLog from './read-git-log';

export default (directory, fieldNames) => {
  let process;
  return xs.create({
    start(listener) {
      const fields = getFields(fieldNames);
      process = readGitLog(directory, fields);
      process.on('close', () => listener.complete());
      process.stdout.on('data', str =>
        str
          .split(/\n?<commit>|<\/commit>\n?/g)
          .filter(Boolean)
          .map(line =>
            fields.reduce((commit, field) => {
              const start = line.indexOf(field.openTag) + field.openTag.length;
              const end = line.indexOf(field.closeTag);
              commit[field.name] = line.substring(start, end).trim();
              return commit;
            }, {})
          )
          .forEach(commit => listener.next(commit))
      );
    },
    stop() {
      process.kill();
    }
  });
};
