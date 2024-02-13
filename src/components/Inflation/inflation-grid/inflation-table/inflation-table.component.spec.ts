import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InflationTableComponent } from './inflation-table.component';

describe('InflationTableComponent', () => {
  let component: InflationTableComponent;
  let fixture: ComponentFixture<InflationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InflationTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InflationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
