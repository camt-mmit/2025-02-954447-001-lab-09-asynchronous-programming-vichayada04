import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, model } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { DynamicSection } from '../../types';

@Component({
  selector: 'app-dynamic-section-form',
  standalone: true,
  imports: [FormField, DecimalPipe],
  templateUrl: './dynamic-section-form.html',
  styleUrl: './dynamic-section-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionForm {
  readonly data = model.required<DynamicSection>();
  protected readonly form = form(this.data);

  // คำนวณผลรวมแยกแต่ละ Section แบบ Real-time
  protected readonly sums = computed(() => {
    const allSections = (this.form().value() ?? []) as DynamicSection;
    return allSections.map((section) =>
      (section ?? []).reduce((acc: number, curr: number) => acc + (curr || 0), 0),
    );
  });

  protected addSection() {
    this.form().value.update((v) => [...(v || []), [0]]);
  }

  protected removeSection(i: number) {
    this.form().value.update((v) => {
      if (v.length <= 1) return v; // ป้องกันในระดับ Code
      return v.filter((_, idx) => idx !== i);
    });
  }

  protected addNumber(si: number) {
    this.form().value.update((v) => {
      const newV = [...v];
      newV[si] = [...newV[si], 0];
      return newV as unknown as DynamicSection;
    });
  }

  protected removeNumber(si: number, ni: number) {
    this.form().value.update((v) => {
      const newV = [...v];
      if (newV[si].length <= 1) return v; // ป้องกันในระดับ Code
      newV[si] = newV[si].filter((_, idx) => idx !== ni);
      return newV as unknown as DynamicSection;
    });
  }
}
