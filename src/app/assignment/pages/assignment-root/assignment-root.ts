import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-assignment-root',
  standalone: true,
  // มั่นใจว่ามี 3 ตัวนี้เพื่อให้ปุ่ม View/Form ใน HTML ใช้งานได้
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './assignment-root.html',
  styleUrl: './assignment-root.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentRootPageComponent {
  // หน้า Page นี้ทำหน้าที่เป็น Layout หลัก (Container)
  // สำหรับสลับระหว่างหน้า View และ Form
}
