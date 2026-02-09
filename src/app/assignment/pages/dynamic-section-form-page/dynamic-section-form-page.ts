import { Component, effect, inject, resource } from '@angular/core';
import { DynamicSectionForm } from '../../component/dynamic-section-form/dynamic-section-form';
import { DynamicSectionDataStorage } from '../../services/dynamic-section-data.storage';

@Component({
  standalone: true,
  imports: [DynamicSectionForm],
  template: `
    @if (dataResource.hasValue()) {
      <app-dynamic-section-form [(data)]="$any(dataResource.value)!" />
    } @else {
      <div class="_message">Loading...</div>
    }
  `,
})
export class DynamicSectionFormPage {
  private storage = inject(DynamicSectionDataStorage);

  protected dataResource = resource({
    loader: async () => {
      const saved = await this.storage.get();
      // ถ้าไม่มีข้อมูล ให้เริ่มที่ [[0]] เพื่อให้ Number 1 ขึ้นทันที
      return saved ?? [[0]];
    },
  });

  private readonly _saveEffect = effect(() => {
    const value = this.dataResource.value();
    if (value) this.storage.set(value);
  });
}
