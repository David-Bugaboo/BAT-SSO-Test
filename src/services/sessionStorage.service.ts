import { SessionServiceKeys } from '../core/constants';
import { ISessionStorageService } from './Interfaces/ISessionStorageService';

export class SessionService implements ISessionStorageService {
  private storage: Storage;

  constructor() {
    this.storage = sessionStorage;
  }

  set(key: SessionServiceKeys, value: string): void {
    this.storage.setItem(key, value);
  }

  get(key: SessionServiceKeys): string | null {
    const data = this.storage.getItem(key);
    return data || null;
  }

  delete(key: SessionServiceKeys): void {
    this.storage.removeItem(key);
  }

  getObject<T>(
    key: SessionServiceKeys,
    ReturnType: new (data: Partial<T>) => T,
  ): T | null {
    let object = null;
    const dataFromStorage = this.storage.getItem(key);
    if (dataFromStorage) {
      object = JSON.parse(dataFromStorage);
      const data = new ReturnType(object);
      return data;
    }
    return null;
  }

  setObject<T>(key: SessionServiceKeys, object: T): void {
    const stringFromData = JSON.stringify(object);
    this.storage.setItem(key, stringFromData);
  }

  static getInstance(): SessionService {
    return new SessionService();
  }
}
