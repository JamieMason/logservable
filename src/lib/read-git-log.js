import { spawn } from 'child_process';

const toNode = field =>
  '<name>placeholder</name>'
    .replace(/name/g, field.name)
    .replace(/placeholder/g, field.placeholder);

export default (directory, fields) => {
  const process = spawn(
    'git',
    [
      'log',
      `--pretty=format:<commit>${fields.map(toNode).join('')}</commit>`,
      '--author-date-order'
    ],
    {
      cwd: directory
    }
  );
  process.stdout.setEncoding('utf8');
  process.stderr.setEncoding('utf8');
  return process;
};
