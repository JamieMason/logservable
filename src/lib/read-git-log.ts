import { IField } from '../index';
import { spawnProcess } from './spawn';

export const readGitLog = (directory: string, fields: IField[], oldestFirst: boolean, skipMergeCommits: boolean) => {
  const fieldNodes = fields.map(({ name, placeholder }) => `<${name}>${placeholder}</${name}>`).join('');
  return spawnProcess(
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
};
