import { spawn, SpawnOptions } from 'child_process';

export const spawnProcess = (program: string, args: string[], options: SpawnOptions) => {
  const task = spawn(program, args, options);
  if (task.stdout) {
    task.stdout.setEncoding('utf8');
  }
  if (task.stderr) {
    task.stderr.setEncoding('utf8');
  }
  return task;
};
