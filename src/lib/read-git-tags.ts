import { ChildProcess, spawn } from 'child_process';

export const readGitTags = (directory: string) => {
  const task = spawn('git', ['show-ref', '--tags'], { cwd: directory });
  task.stdout.setEncoding('utf8');
  task.stderr.setEncoding('utf8');
  return task;
};
