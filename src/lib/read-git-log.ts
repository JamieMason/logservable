import { spawn } from 'child_process';
import { IField } from '../index';

export const readGitLog = (directory: string, fields: IField[], oldestFirst: boolean, skipMergeCommits: boolean) => {
  const fieldNodes = fields.map(({ name, placeholder }) => `<${name}>${placeholder}</${name}>`).join('');
  const task = spawn(
    'git',
    [
      'log',
      `--pretty=format:<commit>${fieldNodes}</commit>`,
      '--author-date-order',
      ...(oldestFirst === true ? ['--reverse'] : []),
      ...(skipMergeCommits === true ? ['--no-merges'] : []),
      '--',
      directory
    ],
    { cwd: directory }
  );
  if (task.stdout) {
    task.stdout.setEncoding('utf8');
  }
  if (task.stderr) {
    task.stderr.setEncoding('utf8');
  }
  return task;
};
