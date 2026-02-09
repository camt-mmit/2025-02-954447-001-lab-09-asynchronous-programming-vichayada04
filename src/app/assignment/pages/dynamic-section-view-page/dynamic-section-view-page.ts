import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { DynamicSectionDataStorage } from '../../services/dynamic-section-data.storage';

@Component({
  selector: 'app-dynamic-section-view-page',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './dynamic-section-view-page.html',
  styleUrl: './dynamic-section-view-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// path: src/app/assignment/pages/dynamic-section-view-page/dynamic-section-view-page.ts
export class DynamicSectionViewPage {
  private storage = inject(DynamicSectionDataStorage);

  protected dataResource = resource({
    loader: async () => {
      const data = await this.storage.get();
      // คืนค่าเป็นอาเรย์ว่างเพื่อให้หน้า HTML เช็ค .length ได้
      return data ?? [];
    },
  });

  protected readonly sumReducer = (acc: number, curr: number) => acc + (curr || 0);
}
