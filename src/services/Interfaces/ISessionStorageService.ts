import { SessionServiceKeys } from '../../core/constants';

export interface ISessionStorageService {
  set(key: SessionServiceKeys, value: string): void;
  get(key: SessionServiceKeys): string | null;
  delete(key: SessionServiceKeys): void;
  getObject<T>(
    key: SessionServiceKeys,
    returnType: { new (data: Partial<T>): T },
  ): T | null;
  setObject<T>(key: SessionServiceKeys, object: T): void;
}
