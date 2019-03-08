import { ChildProcess, spawn } from 'child_process';

export const readGitTags = (directory: string) => {
  const task = spawn('git', ['show-ref', '--tags'], { cwd: directory });
  if (task.stdout) {
    task.stdout.setEncoding('utf8');
  }
  if (task.stderr) {
    task.stderr.setEncoding('utf8');
  }
  return task;
};
