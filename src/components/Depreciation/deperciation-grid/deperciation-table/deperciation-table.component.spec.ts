import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeperciationTableComponent } from './deperciation-table.component';

describe('DeperciationTableComponent', () => {
  let component: DeperciationTableComponent;
  let fixture: ComponentFixture<DeperciationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeperciationTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeperciationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
