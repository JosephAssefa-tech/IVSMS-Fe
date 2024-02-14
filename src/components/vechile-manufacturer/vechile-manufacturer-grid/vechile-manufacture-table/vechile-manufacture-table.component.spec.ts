import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VechileManufactureTableComponent } from './vechile-manufacture-table.component';

describe('VechileManufactureTableComponent', () => {
  let component: VechileManufactureTableComponent;
  let fixture: ComponentFixture<VechileManufactureTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VechileManufactureTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VechileManufactureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
