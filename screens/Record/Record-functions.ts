import idbReady from 'safari-14-idb-fix';
import * as idbKeyval from 'idb-keyval';

const ready = idbReady();

export const getVideo = (id: string) => ready.then(() => idbKeyval.get(id));

export const setVideo = (id: string, blob: Blob) => ready.then(() => idbKeyval.set(id, blob));

export const delVideo = (id: string) => ready.then(() => idbKeyval.del(id));