import xs from 'xstream';
import getFields from './lib/get-fields';
import readGitLog from './lib/read-git-log';

export default (directory, fieldNames, oldestFirst) => {
  let task;
  return xs.create({
    start(listener) {
      const fields = getFields(fieldNames);
      task = readGitLog(directory, fields, oldestFirst);
      task.on('close', () => listener.complete());
      task.stdout.on('data', str =>
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
      task.kill();
    }
  });
};
