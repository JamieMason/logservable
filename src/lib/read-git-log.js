import { spawn } from 'child_process';

const toNode = field =>
  '<name>placeholder</name>'
    .replace(/name/g, field.name)
    .replace(/placeholder/g, field.placeholder);

export default (directory, fields, oldestFirst) => {
  const args = [
    'log',
    `--pretty=format:<commit>${fields.map(toNode).join('')}</commit>`,
    '--author-date-order'
  ];
  const task = spawn('git', oldestFirst === true ? args.concat('--reverse') : args, {
    cwd: directory
  });
  task.stdout.setEncoding('utf8');
  task.stderr.setEncoding('utf8');
  return task;
};
