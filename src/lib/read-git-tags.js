import { spawn } from 'child_process';

export default directory => {
  const task = spawn('git', ['show-ref', '--tags'], { cwd: directory });
  task.stdout.setEncoding('utf8');
  task.stderr.setEncoding('utf8');
  return task;
};
