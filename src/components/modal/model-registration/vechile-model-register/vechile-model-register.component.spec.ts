import { ComponentFixture, TestBed } from '@angular/core/testing';

import VechileModelRegisterComponent from './vechile-model-register.component';

describe('VechileModelRegisterComponent', () => {
  let component: VechileModelRegisterComponent;
  let fixture: ComponentFixture<VechileModelRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VechileModelRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VechileModelRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
