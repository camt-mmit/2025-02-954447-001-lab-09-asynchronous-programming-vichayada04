import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicSectionDataStorage } from '../../services/dynamic-section-data.storage';
import { DynamicSection } from '../../types'; // เพิ่มการนำเข้า Type

@Component({
  selector: 'app-dynamic-section-form-page',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './dynamic-section-form-page.html',
  styleUrl: './dynamic-section-form-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionFormPageComponent implements OnInit {
  private readonly storage = inject(DynamicSectionDataStorage);
  
  // ประกาศ Signal สำหรับเก็บข้อมูลในหน้าฟอร์ม
  protected readonly sections = signal<number[][]>([]);

  constructor() {
    /**
     * ระบบ Auto Save:
     * ทำหน้าที่ส่งข้อมูลจากตัวแปร sections ไปบันทึกใน Service ทุกครั้งที่มีการเปลี่ยนแปลง
     */
    effect(() => {
      const data: DynamicSection = this.sections();
      // บันทึกข้อมูลลง Storage (ซึ่งใน Service เราเขียนดักไว้แล้วว่าถ้าเป็น [[0]] จะไม่บันทึกจริง)
      this.storage.save(data);
    });
  }

  /**
   * ระบบจัดการค่าเริ่มต้นเมื่อโหลดหน้าจอ
   */
  async ngOnInit() {
    // ดึงข้อมูลล่าสุดจาก Storage (ถ้าเป็นการ Refresh ค่าที่ได้จะเป็น null เสมอ)
    const savedData = await this.storage.get();

    if (savedData && savedData.length > 0) {
      // กรณีสลับหน้าไปมา (ไม่ได้รีเฟรช): ให้ใช้ข้อมูลเดิม
      this.sections.set(savedData.map((s) => [...s]));
    } else {
      // กรณีเปิดหน้าครั้งแรก หรือ กด Refresh (F5):
      // ให้รีเซ็ตกลับไปเป็น 1 Section และมี 1 Number (ค่าเริ่มต้นเป็น 0)
      this.sections.set([[0]]);
    }
  }

  // ฟังก์ชันเพิ่ม Section ใหม่ (กำหนดให้มี Number 1 ช่องทันทีตามโจทย์)
  protected addSection() {
    this.sections.update((s) => [...s, [0]]);
  }

  // ฟังก์ชันลบ Section
  protected removeSection(sIdx: number) {
    this.sections.update((s) => s.filter((_, i) => i !== sIdx));
  }

  // ฟังก์ชันเพิ่มช่องกรอกตัวเลข (Number) ใน Section นั้นๆ
  protected addNumber(sIdx: number) {
    this.sections.update((s) => {
      const newSections = s.map((section, index) => 
        index === sIdx ? [...section, 0] : section
      );
      return newSections;
    });
  }

  // ฟังก์ชันลบช่องกรอกตัวเลข (Number)
  protected removeNumber(sIdx: number, nIdx: number) {
    this.sections.update((s) => {
      const newSections = s.map((section, index) => 
        index === sIdx ? section.filter((_, i) => i !== nIdx) : section
      );
      return newSections;
    });
  }

  // ฟังก์ชันคำนวณผลรวมของแต่ละ Section เพื่อแสดงที่หน้าจอ
  protected getSum(section: number[]): number {
    return section.reduce((a, b) => a + (Number(b) || 0), 0);
  }
}