import { APP_ID, Injectable, inject } from '@angular/core';
import { DynamicSection } from '../types';

const keyId = 'dynamic-section-data';

@Injectable({ providedIn: 'root' })
export class DynamicSectionDataStorage {
  private readonly keyName = `${inject(APP_ID)}-${keyId}` as const;

  async get(): Promise<DynamicSection | null> {
    return JSON.parse(localStorage.getItem(this.keyName) ?? 'null');
  }

  async set(data: DynamicSection): Promise<void> {
    localStorage.setItem(this.keyName, JSON.stringify(data));
  }
}
