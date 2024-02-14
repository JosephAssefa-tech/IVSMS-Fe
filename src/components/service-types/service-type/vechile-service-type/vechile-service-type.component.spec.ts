import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VechileServiceTypeComponent } from './vechile-service-type.component';

describe('VechileServiceTypeComponent', () => {
  let component: VechileServiceTypeComponent;
  let fixture: ComponentFixture<VechileServiceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VechileServiceTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VechileServiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
