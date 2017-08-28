import xs from 'xstream';

export default ({ start, mapData }) => {
  let task;
  return xs.create({
    start(listener) {
      task = start();
      task.on('close', () => listener.complete());
      task.stdout.on('data', str => mapData(str).forEach(output => listener.next(output)));
    },
    stop() {
      task.kill();
    }
  });
};
