import { Observable, Observer } from 'rxjs';
import { IStreamProcessOptions, StreamProcessor } from '../typings';

export const streamProcess: StreamProcessor = <T>({ start, mapData }: IStreamProcessOptions) =>
  Observable.create((observer: Observer<T>) => {
    const unsubscribe = () => task.kill();
    const task = start();
    task.on('close', () => observer.complete());
    task.stdout.on('data', (str: string) => mapData(str).forEach((output: T) => observer.next(output)));
    return unsubscribe;
  });
