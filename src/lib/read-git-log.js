import { spawn } from 'child_process';

export default (directory, fields, oldestFirst) => {
  const toNode = ({ name, placeholder }) => `<${name}>${placeholder}</${name}>`;
  const getNodes = fields => fields.map(toNode).join('');
  const baseArgs = [
    'log',
    `--pretty=format:<commit>${getNodes(fields)}</commit>`,
    '--author-date-order'
  ];
  const args = oldestFirst === true ? baseArgs.concat('--reverse') : baseArgs;
  const task = spawn('git', args, { cwd: directory });
  task.stdout.setEncoding('utf8');
  task.stderr.setEncoding('utf8');
  return task;
};
