import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSectionFormPageComponent } from './dynamic-section-form-page';

describe('DynamicSectionFormPage', () => {
  let component: DynamicSectionFormPageComponent;
  let fixture: ComponentFixture<DynamicSectionFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicSectionFormPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicSectionFormPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
