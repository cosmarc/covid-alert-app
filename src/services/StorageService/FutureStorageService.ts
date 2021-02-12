import PQueue from 'p-queue';

import {SecureKeyValueStore, UnsecureKeyValueStore} from './KeyValueStore';

export enum StorageType {
  Unsecure,
  Secure,
}

export interface KeyDefinition {
  keyIdentifier: string;
  storageType: StorageType;
}

export interface FutureStorageService {
  save(keyDefinition: KeyDefinition, value: string): Promise<void>;
  retrieve(keyDefinition: KeyDefinition): Promise<string | null>;
  delete(keyDefinition: KeyDefinition): Promise<void>;
}

export class DefaultFutureStorageService implements FutureStorageService {
  private static instance: FutureStorageService;

  static sharedInstance(): FutureStorageService {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  private unsecureKeyValueStore: UnsecureKeyValueStore;
  private secureKeyValueStore: SecureKeyValueStore;

  private serialPromiseQueue: PQueue;

  private constructor() {
    this.unsecureKeyValueStore = new UnsecureKeyValueStore();
    this.secureKeyValueStore = new SecureKeyValueStore();
    this.serialPromiseQueue = new PQueue({concurrency: 1});
  }

  save(keyDefinition: KeyDefinition, value: string): Promise<void> {
    return this.serialPromiseQueue.add(() => {
      switch (keyDefinition.storageType) {
        case StorageType.Unsecure:
          return this.unsecureKeyValueStore.save(keyDefinition.keyIdentifier, value);
        case StorageType.Secure:
          return this.secureKeyValueStore.save(keyDefinition.keyIdentifier, value);
      }
    });
  }

  retrieve(keyDefinition: KeyDefinition): Promise<string | null> {
    return this.serialPromiseQueue.add(() => {
      switch (keyDefinition.storageType) {
        case StorageType.Unsecure:
          return this.unsecureKeyValueStore.retrieve(keyDefinition.keyIdentifier);
        case StorageType.Secure:
          return this.secureKeyValueStore.retrieve(keyDefinition.keyIdentifier);
      }
    });
  }

  delete(keyDefinition: KeyDefinition): Promise<void> {
    return this.serialPromiseQueue.add(() => {
      switch (keyDefinition.storageType) {
        case StorageType.Unsecure:
          return this.unsecureKeyValueStore.delete(keyDefinition.keyIdentifier);
        case StorageType.Secure:
          return this.secureKeyValueStore.delete(keyDefinition.keyIdentifier);
      }
    });
  }
}
