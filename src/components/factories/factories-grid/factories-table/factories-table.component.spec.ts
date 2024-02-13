import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoriesTableComponent } from './factories-table.component';

describe('FactoriesTableComponent', () => {
  let component: FactoriesTableComponent;
  let fixture: ComponentFixture<FactoriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactoriesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
