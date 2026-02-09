import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicSectionViewComponent } from '../../components/dynamic-section-view/dynamic-section-view';

@Component({
  standalone: true,
  imports: [DynamicSectionViewComponent],
  template: ` <app-dynamic-section-view /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionViewPageComponent {
  // คุณสามารถลบโค้ดเรื่อง resource หรือ storage ในหน้านี้ออกได้เลย
  // เพราะหน้า Page นี้ทำหน้าที่เป็นแค่ Container เฉยๆ ในตอนนี้
}
