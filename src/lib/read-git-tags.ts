import { spawnProcess } from './spawn';

export const readGitTags = (directory: string) => spawnProcess('git', ['show-ref', '--tags'], { cwd: directory });
