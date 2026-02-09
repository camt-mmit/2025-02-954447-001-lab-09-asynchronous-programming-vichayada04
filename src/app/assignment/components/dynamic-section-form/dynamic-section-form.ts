import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal, effect } from '@angular/core'; // เพิ่ม effect
import { FormsModule } from '@angular/forms';
import { DynamicSectionDataStorage } from '../../services/dynamic-section-data.storage';
import { DynamicSection } from '../../types';

@Component({
  selector: 'app-dynamic-section-form',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './dynamic-section-form.html',
  styleUrl: './dynamic-section-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionForm implements OnInit {
  private storage = inject(DynamicSectionDataStorage);
  sections = signal<number[][]>([]);

  constructor() {
    // --- จุดสำคัญ: Auto Save ---
    // effect จะติดตามการเปลี่ยนแปลงของ this.sections() 
    // เมื่อมีการพิมพ์เลข เพิ่ม/ลบ Section มันจะสั่ง save อัตโนมัติทันที
    effect(() => {
      const data = this.sections() as DynamicSection;
      this.storage.save(data);
      console.log('Auto-saved:', data); // เอาไว้เช็คใน Console ว่ามันเซฟจริงไหม
    });
  }

  async ngOnInit() {
    const data = await this.storage.get();
    if (data) {
      this.sections.set(data.map((s) => [...s]));
    }
  }

  addSection() {
    this.sections.update((s) => [...s, []]);
  }

  removeSection(index: number) {
    this.sections.update((s) => s.filter((_, i) => i !== index));
  }

  addNumber(sectionIndex: number) {
    this.sections.update((s) => {
      const newSections = [...s];
      newSections[sectionIndex] = [...newSections[sectionIndex], 0];
      return newSections;
    });
  }

  removeNumber(sectionIndex: number, numIndex: number) {
    this.sections.update((s) => {
      const newSections = [...s];
      newSections[sectionIndex] = newSections[sectionIndex].filter((_, i) => i !== numIndex);
      return newSections;
    });
  }

  // ลบฟังก์ชัน onSave เดิมออกได้เลยครับ เพราะเราใช้ effect แทนแล้ว
  
  getSum(section: number[]): number {
    return section.reduce((a, b) => a + Number(b), 0);
  }
}