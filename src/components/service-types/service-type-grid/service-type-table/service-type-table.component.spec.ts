import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTypeTableComponent } from './service-type-table.component';

describe('ServiceTypeTableComponent', () => {
  let component: ServiceTypeTableComponent;
  let fixture: ComponentFixture<ServiceTypeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceTypeTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
