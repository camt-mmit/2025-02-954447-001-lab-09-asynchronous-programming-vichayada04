import { ComponentFixture, TestBed } from '@angular/core/testing';
// ตรวจสอบว่าชื่อ Class ตรงกับในไฟล์ dynamic-section-view.ts หรือไม่
import { DynamicSectionViewComponent } from './dynamic-section-view';

describe('DynamicSectionView', () => {
  let component: DynamicSectionViewComponent;
  let fixture: ComponentFixture<DynamicSectionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // ถ้า DynamicSectionView เป็น Standalone Component ให้ใส่ใน imports
      imports: [DynamicSectionViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicSectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ใช้ detectChanges แทน whenStable เพื่ออัปเดตข้อมูลเบื้องต้น
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
