import Rx from 'rxjs/Rx';

export default ({ start, mapData }) =>
  Rx.Observable.create(observer => {
    const unsubscribe = () => task.kill();
    const task = start();
    task.on('close', () => observer.complete());
    task.stdout.on('data', str => mapData(str).forEach(output => observer.next(output)));
    return unsubscribe;
  });
