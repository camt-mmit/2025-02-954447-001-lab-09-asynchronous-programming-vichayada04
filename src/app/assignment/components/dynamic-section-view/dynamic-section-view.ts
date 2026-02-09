import { DecimalPipe } from '@angular/common'; // เพิ่ม pipe สำหรับจัดรูปแบบตัวเลข
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'; // เพิ่ม inject
import { DynamicSectionDataStorage } from '../../services/dynamic-section-data.storage'; // import storage เข้ามา

@Component({
  selector: 'app-dynamic-section-view',
  standalone: true,
  imports: [DecimalPipe], // นำเข้า DecimalPipe เพื่อใช้ | number ใน HTML
  templateUrl: './dynamic-section-view.html',
  styleUrl: './dynamic-section-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionViewComponent {
  // ฉีด Service เข้ามา และตั้งชื่อว่า storage ให้ตรงกับที่ใช้ใน HTML
  public storage = inject(DynamicSectionDataStorage);

  // ฟังก์ชันคำนวณผลรวมสำหรับแสดงในหน้า View (เหมือนในหน้า Form)
  getSum(section: readonly number[]): number {
    return section.reduce((a, b) => a + Number(b), 0);
  }
}
