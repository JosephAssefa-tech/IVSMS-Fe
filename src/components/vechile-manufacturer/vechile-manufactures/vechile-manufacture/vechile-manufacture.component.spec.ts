import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VechileManufactureComponent } from './vechile-manufacture.component';

describe('VechileManufactureComponent', () => {
  let component: VechileManufactureComponent;
  let fixture: ComponentFixture<VechileManufactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VechileManufactureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VechileManufactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
